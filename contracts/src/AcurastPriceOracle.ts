import {
  Field,
  SmartContract,
  state,
  State,
  method,
  PublicKey,
  Signature,
  // CircuitString,
} from 'o1js';

// The public key of our trusted data provider
const ORACLE_PUBLIC_KEY =
  'B62qiuqHEdkoUn6URQjcTH6BbqGMhWYiCpHs45Vh1RKMBH1LiFJC5iP';
// const ORACLE_SYMBOL = 'BTC';

export class AcurastPriceOracle extends SmartContract {
  // Define contract state
  @state(PublicKey) oraclePublicKey = State<PublicKey>();
  // @state(CircuitString) symbol = State<CircuitString>();
  @state(Field) counter = State<Field>();
  @state(Field) priceDataBTC = State<Field>();
  @state(Field) priceDataETH = State<Field>();
  @state(Field) priceDataMINA = State<Field>();

  // Define contract events
  events = {
    newCounter: Field,
    newPriceDataBTC: Field,
    newPriceDataETH: Field,
    newPriceDataMINA: Field,
  };

  init() {
    super.init();
    // Initialize contract state
    this.oraclePublicKey.set(PublicKey.fromBase58(ORACLE_PUBLIC_KEY));
    // this.symbol.set(CircuitString.fromString(ORACLE_SYMBOL));
    this.counter.set(Field(0));
    this.priceDataBTC.set(Field(0));
    this.priceDataETH.set(Field(0));
    this.priceDataMINA.set(Field(0));
    // Specify that caller should include signature with tx instead of proof
    this.requireSignature();
  }

  @method update(
    nextCounter: Field,
    priceDataBTC: Field,
    priceDataETH: Field,
    priceDataMINA: Field,
    signature: Signature
  ) {
    // Get the oracle public key from the contract state
    const oraclePublicKey = this.oraclePublicKey.get();
    this.oraclePublicKey.assertEquals(oraclePublicKey);

    // Get the internal counter from the contract state
    const internalCounter = this.counter.get();
    this.counter.assertEquals(internalCounter);

    // Increase internal counter by one and assert if it's the same that the user passed
    const internalNextCounter = internalCounter.add(1);
    internalNextCounter.assertEquals(nextCounter);

    // Update counter
    this.counter.set(internalNextCounter);

    // Check if the signature is valid for the provided data
    const validSignature = signature.verify(oraclePublicKey, [
      nextCounter,
      priceDataBTC,
      priceDataETH,
      priceDataMINA,
    ]);
    validSignature.assertTrue();

    // Store priceData on chain
    this.priceDataBTC.set(priceDataBTC);
    this.priceDataETH.set(priceDataETH);
    this.priceDataMINA.set(priceDataMINA);

    // Emit price Data event
    this.emitEvent('newCounter', internalNextCounter);
    this.emitEvent('newPriceDataBTC', priceDataBTC);
    this.emitEvent('newPriceDataETH', priceDataETH);
    this.emitEvent('newPriceDataMINA', priceDataMINA);
  }
}
