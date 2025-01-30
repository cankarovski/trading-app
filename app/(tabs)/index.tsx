import { AppStateStatus, AppState } from "react-native";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBtcEurPrices, getBtcEurTicker } from "@/lib/api/prices";
import { PriceData, setPriceData } from "@/lib/store/priceSlice";
import { AppDispatch } from "@/lib/store";
import TradeDialog from "@/components/Dialog/TradeDialog";
import ThemedButton from "@/components/Button/ThemedButton";
import { resetAppState } from "@/lib/store/reset";
import Trades from "@/components/Trades/Trades";
import ContentScrollView from "@/components/ContentScrollView";
import { Ticker, updateTicker } from "@/lib/store/tickerSlice";

import useToast from "@/hooks/useToast";
import PriceChart from "@/components/Chart/PriceChart";
import CurrentTicker from "@/components/Ticker/CurrentTicker";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [loadingTicker, setLoadingTicker] = useState(true);

  const toast = useToast();

  const [isDialogVisible, setDialogVisible] = useState(false);

  const openDialogHandler = () => setDialogVisible(true);
  const closeDialogHandler = () => setDialogVisible(false);

  const fetchData = () => {
    setLoading(true);
    getBtcEurPrices().then((data: PriceData[] | null) => {
      setLoading(false);
      if (data) {
        dispatch(setPriceData(data));
      }
    });

    setLoadingTicker(true);
    getBtcEurTicker().then((data: Ticker | null) => {
      setLoadingTicker(false);
      if (data) {
        dispatch(updateTicker(data));
      }
    });
  };

  useEffect(() => {
    fetchData();

    // refetch on active app state
    const appStateChangeHandler = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        fetchData();
      }
    };

    // refetch on net info connected
    const netInfoChangeHandler = (state: NetInfoState) => {
      if (state.isConnected) {
        fetchData();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      appStateChangeHandler
    );

    const unsubscribe = NetInfo.addEventListener((state) => {
      netInfoChangeHandler(state);
    });

    const intervalId = setInterval(fetchData, 5000);

    return () => {
      subscription.remove();
      clearInterval(intervalId);
      unsubscribe();
    };
  }, []);

  const resetHandler = async () => {
    try {
      await resetAppState();

      toast({
        type: "success",
        text1: "Success",
        text2: "App state has been reset!",
      });

      fetchData();
    } catch (error) {
      console.error("Error resetting app state:", error);

      toast({
        type: "error",
        text1: "Error",
        text2: "Failed to reset app state.",
      });
    }
  };

  return (
    <ContentScrollView>
      <CurrentTicker />

      <PriceChart />

      <ThemedButton text="Trade" pressHandler={openDialogHandler} />

      <TradeDialog visible={isDialogVisible} onClose={closeDialogHandler} />

      <Trades />

      {__DEV__ && (
        <ThemedButton
          type="secondary"
          text="RESET APP"
          pressHandler={resetHandler}
        />
      )}
    </ContentScrollView>
  );
}
