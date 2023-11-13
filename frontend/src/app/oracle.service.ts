import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

export interface ZkAppStateResult {
  accounts: {
    zkappState: [
      unknown: string,
      unknown: string,
      counter: string,
      btc: string,
      eth: string,
      mina: string,
      unknown: string,
      unknown: string
    ];
  }[];
}

const ORACLE_PUBLIC_KEY =
  'B62qpp64LMwifdSmJSGRwksxrF5SEpYTQMX1kekS7GYdM9Y8TspXCvC';

@Injectable({
  providedIn: 'root',
})
export class OracleService {
  private zkAppStateQuery: QueryRef<ZkAppStateResult, { offset: number }>;

  constructor(private apollo: Apollo) {
    // TODO: Do manual fetching until o1js works in Angular so we can use the AcurastPriceOracle class
    this.zkAppStateQuery = this.apollo.watchQuery({
      query: gql`query {
        accounts(publicKey: "${ORACLE_PUBLIC_KEY}") {
          zkappState
        }
      }`,
    });

    this.fetchData();
  }

  async getPrices() {
    const state = await this.fetchData();
    return {
      counter: state.accounts[0].zkappState[2],
      btc: state.accounts[0].zkappState[3],
      eth: state.accounts[0].zkappState[4],
      mina: state.accounts[0].zkappState[5],
    };
  }

  async fetchData() {
    const state = await this.getState(0);
    console.log('STATE', state);
    return state;
  }

  async getState(offset: number): Promise<ZkAppStateResult> {
    const result = await this.zkAppStateQuery.refetch({ offset });
    return result.data;
  }
}
