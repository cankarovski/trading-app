import { RootState } from "@/lib/store";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { ThemedView } from "../ThemedView";
import { Colors } from "@/constants/Colors";

const PriceChart = () => {
  const theme = useColorScheme() ?? "light";
  const prices = useSelector((state: RootState) => state.price.data);

  const backgroundColor = Colors[theme].background;
  const color = Colors[theme].text;

  const btcPrices = prices.map((data) => parseFloat(data.close));
  const timestamps = prices.map((data) => data.timestamp);

  return !prices.length ? (
    ""
  ) : (
    <ThemedView>
      <LineChart
        data={{
          labels: timestamps,
          datasets: [
            {
              data: btcPrices,
            },
          ],
        }}
        width={Dimensions.get("window").width - 40} // padding 20 on each side
        height={300}
        chartConfig={{
          fillShadowGradientFromOpacity: 0.8,
          fillShadowGradientToOpacity: 0,
          backgroundColor,
          backgroundGradientFrom: backgroundColor,
          backgroundGradientTo: backgroundColor,
          decimalPlaces: 1,
          color: () => `rgba(120, 230, 255, 1)`,
          labelColor: () => color,
          style: {
            // borderRadius: 16,
            // paddingLeft: 50,
            // paddingBottom: 0,
            // width: Dimensions.get("window").width - 200,
            // width: 120,
          },
          propsForDots: {
            r: "0",
          },
        }}
        withOuterLines={false}
        withInnerLines={false} // Remove grid lines
        withVerticalLabels={false} // Keep Y-axis labels
        // withHorizontalLabels={false} // Remove X-axis labels
        // yAxisSuffix="€" // Add suffix to Y-axis labels
        // yAxisInterval={10} // Adjust intervals if needed
        // verticalLabelRotation={0} // Ensure Y labels are upright
        yLabelsOffset={-(Dimensions.get("window").width - 40)}
        style={{
          // paddingLeft: 100,
          paddingBottom: 0,
          paddingRight: 0,
          // marginLeft: 0,
          // paddingHorizontal: 100,
          // marginVertical: 0,
          // marginHorizontal: 0,
        }}
      />
    </ThemedView>
  );
};

export default PriceChart;
