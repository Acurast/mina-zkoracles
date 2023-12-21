import useZkappWorker from "@/hooks/use-zkappworker";
import ZkappWorkerClient from "@/utils/zkappWorkerClient";
import { PublicKey } from "o1js";
import { createContext } from "react";

const ZkappContext = createContext({
  zkappWorkerClient: null as null | ZkappWorkerClient,
  hasWallet: null as null | boolean,
  hasBeenSetup: false,
  accountExists: false,
  publicKey: null as null | PublicKey,
  zkappPublicKey: null as null | PublicKey,
  creatingTransaction: false,
});

const ZkappContextProvider = ({ children }: any) => {
  const state = useZkappWorker();
  return (
    <ZkappContext.Provider value={state}>{children}</ZkappContext.Provider>
  );
};

export { ZkappContext, ZkappContextProvider };
