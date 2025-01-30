import React from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { PriceData } from "@/lib/store/priceSlice";
import { StyleSheet } from "react-native";
import {
  CHART_BOTTOM_PADDING,
  CHART_HEIGHT,
  CHART_TOP_PADDING,
  LABELS_WIDTH,
} from "./PriceChart";

type PriceLabelsProps = {
  prices: PriceData[];
};

export default function PriceLabels({ prices }: PriceLabelsProps) {
  const pricesData = prices.map((item) => parseFloat(item.close));

  const minPrice = Math.min(...pricesData);
  const maxPrice = Math.max(...pricesData);

  const step = (maxPrice - minPrice) / 5;

  const spacedPrices = [
    minPrice,
    ...Array.from({ length: 4 }, (_, i) => minPrice + step * (i + 1)),
    maxPrice,
  ];

  return (
    <ThemedView style={styles.container}>
      {spacedPrices.map((price) => {
        return (
          <ThemedText style={styles.price} key={price}>
            {price}
          </ThemedText>
        );
      })}
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: LABELS_WIDTH,
    height: CHART_HEIGHT - CHART_BOTTOM_PADDING - CHART_TOP_PADDING,
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "space-between",
  },
  price: {
    width: "100%",
    textAlign: "right",
    zIndex: 1,
    fontSize: 8,
    lineHeight: 8,
  },
});
