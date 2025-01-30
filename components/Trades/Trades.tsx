import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { StyleSheet, View } from "react-native";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { capitalize, formatCurrency, formatTime } from "@/lib/utils";


export default function Trades() {
  const trades = useSelector((state: RootState) => state.trades.data);

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={styles.content}
        lightColor="#EEEEEE"
        darkColor="#222222"
      >
        {trades?.length ? (
          trades.slice(0, 10).map((data) => {
            return (
              <View style={styles.row} key={data.timestamp}>
                <ThemedText style={styles.leftColumn}>
                  {capitalize(data.type)}
                </ThemedText>
                <ThemedText style={[styles.centerColumn]}>
                  {data.type === "buy" ? "+" : "-"}
                  {data.amount} BTC / {data.type === "sell" ? "+" : "-"}
                  {formatCurrency(data.price)}
                </ThemedText>
                <ThemedText style={styles.rightColumn}>
                  {formatTime(data?.timestamp ?? "N/A")}
                </ThemedText>
              </View>
            );
          })
        ) : (
          <ThemedText>no data</ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
  },
  content: {
    borderRadius: 12,
    padding: 20,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftColumn: {
    flex: 0,
    fontSize: 12,
    lineHeight: 21,
    width: 30,
    fontWeight: 600,
  },
  centerColumn: {
    flex: 1,
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 600,
    textAlign: "center",
  },
  rightColumn: {
    flex: 0,
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 600,
  },
});
