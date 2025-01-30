import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { StyleSheet } from "react-native";
import { calculateTotalPnL, formatCurrency } from "@/lib/utils";

export default function CurrentTicker() {
  const ticker = useSelector((state: RootState) => state.ticker.data);
  const trades = useSelector((state: RootState) => state.trades.data);

  const pnl = calculateTotalPnL(trades);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">BTC</ThemedText>
      <ThemedText type="title">{formatCurrency(ticker?.last)}</ThemedText>
      <ThemedText style={styles.text}>
        PnL:{" "}
        <ThemedText
          style={[
            styles.text,
            pnl.totalSellRevenue === pnl.totalBuyCost
              ? undefined
              : pnl.totalSellRevenue > pnl.totalBuyCost
              ? styles.positive
              : styles.negative,
          ]}
        >
          {formatCurrency(pnl.totalSellRevenue - pnl.totalBuyCost)}
        </ThemedText>
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
  text: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,
  },
});
