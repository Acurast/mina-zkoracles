import { AcurastPriceOracle } from './AcurastPriceOracle.js';
import {
  isReady,
  shutdown,
  Mina,
  Field,
  PrivateKey,
  // fetchAccount,
  Signature,
} from 'o1js';

import {
  getPrice,
  loopUntilAccountExists,
  makeAndSendTransaction,
  zkAppNeedsInitialization,
  // accountExists
} from './utils.js';
import fs from 'fs';

(async function main() {
  await isReady;

  console.log('AcurastPriceOracle: o1js loaded');

  // ----------------------------------------------------

  const Berkeley = Mina.BerkeleyQANet(
    'https://proxy.berkeley.minaexplorer.com/graphql'
  );
  Mina.setActiveInstance(Berkeley);

  let transactionFee = 100_000_000;

  const deployerKeysFileContents = fs.readFileSync('keys/testnet.json', 'utf8');

  let key = JSON.parse(deployerKeysFileContents);

  const deployerPrivateKeyBase58 = key.privateKey;

  const deployerPrivateKey = PrivateKey.fromBase58(deployerPrivateKeyBase58);

  // DEPLOYER KEY

  const feePayerPrivateKeyFileContents = fs.readFileSync(
    'keys/deployer.json',
    'utf8'
  );

  let feePayerKey = JSON.parse(feePayerPrivateKeyFileContents);

  const feePayerPrivateKeyBase58 = feePayerKey.privateKey;

  const feePayerPrivateKey = PrivateKey.fromBase58(feePayerPrivateKeyBase58);

  // ----------------------------------------------------

  let account = await loopUntilAccountExists({
    account: deployerPrivateKey.toPublicKey(),
    eachTimeNotExistCallback: () => {
      console.log(
        'Deployer account does not exist. ' +
          'Request funds at faucet ' +
          'https://faucet.minaprotocol.com/?address=' +
          deployerPrivateKey.toPublicKey().toBase58()
      );
    },
    isZkAppAccount: false,
  });

  console.log(
    `Using fee payer account with nonce ${account.nonce}, balance ${account.balance}`
  );

  // ----------------------------------------------------

  const zkAppPrivateKey = deployerPrivateKey;
  const zkAppPublicKey = zkAppPrivateKey.toPublicKey();
  let zkapp = new AcurastPriceOracle(zkAppPublicKey);

  console.log('Compiling smart contract...');
  await AcurastPriceOracle.compile();

  let zkAppAccount = await loopUntilAccountExists({
    account: zkAppPrivateKey.toPublicKey(),
    eachTimeNotExistCallback: () =>
      console.log('waiting for zkApp account to be deployed...'),
    isZkAppAccount: true,
  });

  const needsInitialization = await zkAppNeedsInitialization({ zkAppAccount });

  if (needsInitialization) {
    console.log('initializing smart contract');
    await makeAndSendTransaction({
      feePayerPrivateKey: feePayerPrivateKey,
      zkAppPublicKey: zkAppPublicKey,
      mutateZkApp: () => zkapp.init(),
      transactionFee: transactionFee,
      getStates: () => zkapp.counter.get(),
      statesEqual: (num1, num2) => num1.equals(num2).toBoolean(),
    });
  }

  let counter = await zkapp.counter.get();
  console.log(
    'AcurastPriceOracle: (1) current value of counter is',
    counter.toString()
  );

  try {
    for (;;) {
      // ----------------------------------------------------
      // Request Price and Feed data to on-chain

      const priceDataBTC = await getPrice('BTC');
      const priceDataETH = await getPrice('ETH');
      const priceDataMINA = await getPrice('MINA');

      const nextCounter = counter.add(1);

      const signatureFeed = Signature.create(zkAppPrivateKey, [
        nextCounter,
        priceDataBTC,
        priceDataETH,
        priceDataMINA,
      ]);

      console.log('Signature created');

      await makeAndSendTransaction({
        feePayerPrivateKey: feePayerPrivateKey,
        zkAppPublicKey: zkAppPublicKey,
        mutateZkApp: () => {
          zkapp.update(
            nextCounter,
            priceDataBTC,
            priceDataETH,
            priceDataMINA,
            signatureFeed
          );
        },
        transactionFee: transactionFee,
        getStates: () => [
          zkapp.priceDataBTC.get(),
          zkapp.priceDataETH.get(),
          zkapp.priceDataMINA.get(),
        ],
        statesEqual: (arr1, arr2) =>
          arr1.every((el, index) => el.equals(arr2[index])),
      });

      console.log('Transaction created');

      let onChainData = [
        await zkapp.priceDataBTC.get(),
        await zkapp.priceDataETH.get(),
        await zkapp.priceDataMINA.get(),
      ];
      console.log(
        'AcurastPriceOracle: (2) current value of counter is',
        counter.toString()
      );
      console.log(
        'AcurastPriceOracle: current value of BTC/USD is',
        Number(onChainData[0].toBigInt()) / 1000
      );
      console.log(
        'AcurastPriceOracle: current value of ETH/USD is',
        Number(onChainData[1].toBigInt()) / 1000
      );
      console.log(
        'AcurastPriceOracle: current value of MINA/USD is',
        Number(onChainData[2].toBigInt()) / 1000
      );
    }
  } catch (e) {
    console.log('ERROR ' + (e as Error).message);
  }

  // ----------------------------------------------------

  console.log('Shutting down');

  await shutdown();
})().catch((e) => console.log(e));
