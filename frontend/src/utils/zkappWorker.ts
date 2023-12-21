import { Mina, PublicKey, fetchAccount } from "o1js";

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { AcurastPriceOracle } from "../../../contracts/src/index.js";

const state = {
  AcurastPriceOracle: null as null | typeof AcurastPriceOracle,
  zkapp: null as null | AcurastPriceOracle,
  transaction: null as null | Transaction,
};

// ---------------------------------------------------------------------------------------

const functions = {
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.Network(
      "https://proxy.berkeley.minaexplorer.com/graphql"
    );
    console.log("Berkeley Instance Created");
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async (args: {}) => {
    const { AcurastPriceOracle } = await import(
      "../../../contracts/build/src/index.js"
    );
    state.AcurastPriceOracle = AcurastPriceOracle;
  },
  compileContract: async (args: {}) => {
    await state.AcurastPriceOracle!.compile();
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.AcurastPriceOracle!(publicKey);
  },
  getNum: async (args: {}) => {
    const currentNum = state.zkapp!.counter.get();
    return JSON.stringify(currentNum.toJSON());
  },
  getState: async () => {
    return {
      btcPrice: (
        Number(state.zkapp!.priceDataBTC.get().toBigInt()) / 1000
      ).toFixed(2),
      ethPrice: (
        Number(state.zkapp!.priceDataETH.get().toBigInt()) / 1000
      ).toFixed(2),
      minaPrice: (
        Number(state.zkapp!.priceDataMINA.get().toBigInt()) / 1000
      ).toFixed(2),
    };
  },
  createUpdateTransaction: async (args: {}) => {
    const currentNum = state.zkapp!.counter.get();
    const transaction = await Mina.transaction(() => {
      state.zkapp!.update(
        currentNum,
        "" as any,
        "" as any,
        "" as any,
        "" as any
      ); // todo fill with correct values
    });
    state.transaction = transaction;
  },
  proveUpdateTransaction: async (args: {}) => {
    await state.transaction!.prove();
  },
  getTransactionJSON: async (args: {}) => {
    return state.transaction!.toJSON();
  },
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number;
  fn: WorkerFunctions;
  args: any;
};

export type ZkappWorkerReponse = {
  id: number;
  data: any;
};

if (typeof window !== "undefined") {
  addEventListener(
    "message",
    async (event: MessageEvent<ZkappWorkerRequest>) => {
      const returnData = await functions[event.data.fn](event.data.args);

      const message: ZkappWorkerReponse = {
        id: event.data.id,
        data: returnData,
      };
      postMessage(message);
    }
  );
}

console.log("Web Worker Successfully Initialized.");
