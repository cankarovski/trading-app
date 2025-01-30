import { RootState } from "@/lib/store";
import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { ThemedView } from "../ThemedView";
import { AppColors, Colors } from "@/constants/Colors";
import PriceLabels from "./PriceLabels";
import { ThemedText } from "../ThemedText";
import { formatCurrency } from "@/lib/utils";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";

export const LABELS_WIDTH = 38;
export const CHART_HEIGHT = 300;
export const CHART_BOTTOM_PADDING = 60;
export const CHART_TOP_PADDING = 10;

type DataPointClick = {
  index: number;
  value: number;
  dataset: Dataset;
  x: number;
  y: number;
  getColor: (opacity: number) => string;
};

const PriceChart = () => {
  const theme = useColorScheme() ?? "light";
  const prices = useSelector((state: RootState) => state.price.data);
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>();
  const backgroundColor = Colors[theme].background;
  const color = Colors[theme].text;

  const btcPrices = prices.map((data) => parseFloat(data.close));
  const timestamps = prices.map((data) => data.timestamp);

  const onDataPointClickHandler = (data: DataPointClick) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setTooltipPos({
      x: data.x,
      y: data.y,
      value: data.value,
      visible: true,
    });
    timeoutRef.current = setTimeout(() => {
      setTooltipPos((prev) => ({ ...prev, visible: false }));
    }, 2000);
  };
  return !prices.length ? (
    ""
  ) : (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.chartContainer}>
        <LineChart
          data={{
            labels: timestamps,
            datasets: [
              {
                data: btcPrices,
              },
            ],
          }}
          width={Dimensions.get("window").width - 48 - LABELS_WIDTH} // padding 20 on each side
          height={CHART_HEIGHT}
          chartConfig={{
            fillShadowGradientFromOpacity: 0.3,
            fillShadowGradientToOpacity: 0,
            backgroundColor,
            backgroundGradientFrom: backgroundColor,
            backgroundGradientTo: backgroundColor,
            decimalPlaces: 1,
            color: () => AppColors.primaryAccent,
            labelColor: () => color,
            propsForDots: {
              r: "0",
            },
          }}
          withOuterLines={false}
          withInnerLines={false}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          style={{
            paddingBottom: 0,
            paddingRight: 0,
          }}
          onDataPointClick={onDataPointClickHandler}
        />

        {tooltipPos.visible && (
          <ThemedView
            style={[
              styles.tooltip,
              {
                left: tooltipPos.x - 30,
                top: tooltipPos.y - 40,
              },
            ]}
          >
            <ThemedText style={styles.tooltipText}>
              {formatCurrency(tooltipPos.value)}
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
      <PriceLabels prices={prices} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  chartContainer: {
    height: CHART_HEIGHT - CHART_BOTTOM_PADDING,
    marginTop: -CHART_TOP_PADDING,
  },
  tooltip: {
    position: "absolute",
    backgroundColor: AppColors.primaryAccent,
    padding: 8,
    borderRadius: 5,
    zIndex: 1000,
  },
  tooltipText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default PriceChart;
