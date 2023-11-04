import { Field, Mina, PrivateKey, PublicKey, fetchAccount } from 'o1js';

export const accountExists = async (account: PublicKey) => {
  let response = await fetchAccount({ publicKey: account });
  let accountExists = response.error == null;
  return accountExists;
};

export const loopUntilAccountExists = async ({
  account,
  eachTimeNotExistCallback,
  isZkAppAccount,
}: {
  account: PublicKey;
  eachTimeNotExistCallback: () => void;
  isZkAppAccount: boolean;
}) => {
  for (;;) {
    let response = await fetchAccount({ publicKey: account });
    let accountExists = response.error == null;
    if (isZkAppAccount) {
      accountExists =
        accountExists && response.account!.zkapp!.appState != null;
    }
    if (!accountExists) {
      await eachTimeNotExistCallback();
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } else {
      // TODO add optional check that verification key is correct once this is available in o1js
      return response.account!;
    }
  }
};

// ========================================================

interface ToString {
  toString: () => string;
}

type FetchedAccountResponse = Awaited<ReturnType<typeof fetchAccount>>;
type FetchedAccount = NonNullable<FetchedAccountResponse['account']>;

export const makeAndSendTransaction = async <State extends ToString>({
  feePayerPrivateKey,
  zkAppPublicKey,
  mutateZkApp,
  transactionFee,
  getStates,
  statesEqual,
}: {
  feePayerPrivateKey: PrivateKey;
  zkAppPublicKey: PublicKey;
  mutateZkApp: () => void;
  transactionFee: number;
  getStates: () => State;
  statesEqual: (state1: State, state2: State) => boolean;
}) => {
  const initialStates = getStates();

  // Why this line? It increments internal feePayer account variables, such as
  // nonce, necessary for successfully sending a transaction
  await fetchAccount({ publicKey: feePayerPrivateKey.toPublicKey() });

  let transaction = await Mina.transaction(
    { feePayerKey: feePayerPrivateKey, fee: transactionFee },
    () => {
      mutateZkApp();
    }
  );

  // fill in the proof - this can take a while...
  console.log('Creating an execution proof...');
  const time0 = Date.now();
  await transaction.prove();
  const time1 = Date.now();
  console.log('creating proof took', (time1 - time0) / 1e3, 'seconds');

  console.log('Sending the transaction...');
  const res = await transaction.send();
  const hash = await res.hash(); // This will change in a future version of SnarkyJS
  if (hash == null) {
    console.log('error sending transaction (see above)');
  } else {
    console.log(
      'See transaction at',
      'https://berkeley.minaexplorer.com/transaction/' + hash
    );
  }

  let states = getStates();

  console.log(
    'waiting for zkApp state to change... (current state: ',
    states.toString() + ')'
  );

  let stateChanged = false;
  while (!stateChanged) {
    process.stdout.write('.');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await fetchAccount({ publicKey: zkAppPublicKey });
    states = await getStates();
    stateChanged = !statesEqual(initialStates, states);
  }
  process.stdout.write('\r\n');
};

// ========================================================

export const zkAppNeedsInitialization = async ({
  zkAppAccount,
}: {
  zkAppAccount: FetchedAccount;
}) => {
  console.warn(
    'warning: using a `utils.ts` written before `isProved` made available. Check https://docs.minaprotocol.com/zkapps/tutorials/deploying-to-a-live-network for updates'
  );
  console.log('ACCOUNT', JSON.stringify(zkAppAccount, null, 2));
  // TODO when available in the future, use isProved.
  const allZeros = zkAppAccount.zkapp!.appState!.every((f: Field) =>
    f.equals(Field.from(0)).toBoolean()
  );
  const needsInitialization = allZeros;
  return needsInitialization;
};

// ========================================================
