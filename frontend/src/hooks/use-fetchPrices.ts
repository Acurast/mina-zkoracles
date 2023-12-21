import { ZkappContext } from "@/app/store/ZkappContext";
import { useContext, useEffect, useState } from "react";

const useFetchPrices = () => {
  const [data, setData] = useState({
    btcPrice: 0,
    ethPrice: 0,
    minaPrice: 0,
    lastUpdate: new Date(),
  });
  const { zkappWorkerClient } = useContext(ZkappContext);
  const fetchData = async () => {
    try {
      setData({
        ...(await zkappWorkerClient!.getState()),
        lastUpdate: new Date(),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();

    // Fetch data every 15 minutes (900,000 milliseconds)
    const intervalId = setInterval(fetchData, 900000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // effect runs only once on mount

  return data;
};
export default useFetchPrices;
