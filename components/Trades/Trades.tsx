import React, { useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { formatCurrency, formatTime } from "@/lib/utils";

export default function Trades() {
  const trades = useSelector((state: RootState) => state.trades.data);

  const [centerWidth, setCenterWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setCenterWidth(width);
  };

  return (
    <ThemedView style={styles.container}>
      {trades?.length ? (
        trades.slice(0, 10).map((data) => {
          return (
            <View style={styles.row} key={data.timestamp}>
              <ThemedText style={styles.leftColumn}>{data.type}</ThemedText>
              <ThemedText
                style={[
                  styles.centerColumn,
                  { marginLeft: -(centerWidth / 2) },
                ]}
                onLayout={handleLayout}
              >
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
        <ThemedView>
          <ThemedText type="default">no data</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    display: "flex",
    position: "relative", // Needed for absolute positioning of center column
    flexDirection: "row", // Aligns child elements in a row
    justifyContent: "space-between", // Space between left and right columns, center will automatically align in the middle
    width: "100%",
  },
  leftColumn: {
    alignItems: "flex-start", // Left align the content
    justifyContent: "center",
    fontSize: 12,
  },
  centerColumn: {
    position: "absolute", // Absolutely position the center column
    left: "50%", // Position the left edge of the center column at the center
    justifyContent: "center",

    // position: "absolute", // Absolutely position the center column
    // left: "50%", // Align the center column in the middle horizontally
    // transform: [{ translateX: "-50%" }], // Offset the column by half of its width to truly center it
    // justifyContent: "center",
    fontSize: 12,
  },
  rightColumn: {
    alignItems: "flex-end", // Right align the content
    fontSize: 12,
  },
});
