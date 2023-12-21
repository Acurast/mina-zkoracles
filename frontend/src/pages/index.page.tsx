import Spinner from "@/app/ui/spinner";
import App from "./app.page";
import { ZkappContext, ZkappContextProvider } from "@/app/store/ZkappContext";
import { useContext } from "react";

export default function Home() {
  const Init = () => {
    const { hasBeenSetup } = useContext(ZkappContext);
    const render = hasBeenSetup ? (
      <App />
    ) : (
      <Spinner message={"Loading client..."} />
    );

    return render;
  };

  return <ZkappContextProvider>{<Init />}</ZkappContextProvider>;
}
