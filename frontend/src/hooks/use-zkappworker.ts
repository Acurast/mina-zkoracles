import { useEffect, useState } from "react";
import "../pages/reactCOIServiceWorker";
import ZkappWorkerClient from "../utils/zkappWorkerClient";
import { PublicKey, Field } from "o1js";

const ZKAPP_ADDRESS = "B62qpp64LMwifdSmJSGRwksxrF5SEpYTQMX1kekS7GYdM9Y8TspXCvC";

const useZkappWorker = () => {
  const [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
  });

  // -------------------------------------------------------
  // Do Setup

  useEffect(() => {
    async function timeout(seconds: number): Promise<void> {
      return new Promise<void>((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
    }

    (async () => {
      if (!state.hasBeenSetup) {
        const zkappWorkerClient = new ZkappWorkerClient();
        await timeout(5);
        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;

        if (!mina) {
          setState((prevState) => ({ ...prevState, hasWallet: false }));
          return;
        }

        const publicKeyBase58: string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);
        const res = await zkappWorkerClient.fetchAccount({ publicKey });
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();
        await zkappWorkerClient.compileContract();

        const zkappPublicKey = PublicKey.fromBase58(ZKAPP_ADDRESS);

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey });

        setState((prevState) => ({
          ...prevState,
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey,
          zkappPublicKey,
          accountExists,
        }));
      }
    })();
  }, [state]);

  return state;
};

export default useZkappWorker;
