import { StyleSheet, AppStateStatus, AppState, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBtcEurPrices, getBtcEurTicker } from "@/lib/api/prices";
import { PriceData, setPriceData } from "@/lib/store/priceSlice";
import { AppDispatch, RootState } from "@/lib/store";
import TradeDialog from "@/components/Dialog/TradeDialog";
import ThemedButton from "@/components/Button/ThemedButton";
import { resetAppState } from "@/lib/store/reset";
import Trades from "@/components/Trades/Trades";
import ContentScrollView from "@/components/ContentScrollView";
import { Ticker, updateTicker } from "@/lib/store/tickerSlice";

import useToast from "@/hooks/useToast";
import PriceChart from "@/components/Chart/PriceChart";
import CurrentTicker from "@/components/Ticker/CurrentTicker";

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

    const subscription = AppState.addEventListener(
      "change",
      appStateChangeHandler
    );

    // Set up periodic fetch every 5 seconds (5000ms)
    const intervalId = setInterval(fetchData, 5000);

    return () => {
      subscription.remove();
      clearInterval(intervalId);
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

      <ThemedView>
        <ThemedButton
          type="secondary"
          text="Trade"
          pressHandler={openDialogHandler}
        />
        <TradeDialog visible={isDialogVisible} onClose={closeDialogHandler} />
      </ThemedView>

      <Trades />

      <ThemedView>
        <ThemedButton
          type="secondary"
          text="RESET APP"
          pressHandler={resetHandler}
        />
      </ThemedView>
    </ContentScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
