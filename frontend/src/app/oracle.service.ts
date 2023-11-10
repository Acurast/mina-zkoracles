import { Injectable } from '@angular/core';
import { PublicKey } from 'o1js';

const ORACLE_PUBLIC_KEY =
  'B62qpp64LMwifdSmJSGRwksxrF5SEpYTQMX1kekS7GYdM9Y8TspXCvC';

@Injectable({
  providedIn: 'root',
})
export class OracleService {
  // public readonly oracle: AcurastPriceOracle;

  constructor() {
    // this.oracle = new AcurastPriceOracle(
    //   PublicKey.fromBase58(ORACLE_PUBLIC_KEY)
    // );

    console.log('PK', PublicKey.fromBase58(ORACLE_PUBLIC_KEY));

    this.fetchData();
  }

  fetchData() {
    // const counter = this.oracle.counter.get();
    // const priceDataBTC = this.oracle.priceDataBTC.get();
    // const priceDataETH = this.oracle.priceDataETH.get();
    // const priceDataMINA = this.oracle.priceDataMINA.get();
    // console.log(counter, priceDataBTC, priceDataETH, priceDataMINA);
  }
}
