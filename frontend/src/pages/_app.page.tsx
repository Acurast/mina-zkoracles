import React, { useContext, useEffect, useState } from "react";
import "@/styles/globals.css";
import { ZkappContext, ZkappContextProvider } from "@/app/store/ZkappContext";
import MainPage from "./main.page";
import Spinner from "@/app/ui/spinner";

const App = (props: any) => {
  const Loader = () => {
    return useContext(ZkappContext).hasBeenSetup ? (
      <MainPage />
    ) : (
      <Spinner message={"Loading..."} />
    );
  };

  return (
    <ZkappContextProvider>
      <Loader />
    </ZkappContextProvider>
  );
};

export default App;
