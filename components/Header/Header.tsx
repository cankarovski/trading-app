import React from "react";
import { Image, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

const Header = () => {
  const insets = useSafeAreaInsets();
  const portfolio = useSelector((state: RootState) => state.portfolio);

  return (
    <ThemedView
      style={[
        styles.header,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <Image
        source={{
          uri: "https://play-lh.googleusercontent.com/pMhtXmH2qS4g9GWAQAVq_WVArf4CB9qvgnSyF0StUGuOrLlcSsM91EspimwNxwhnmAsq=w480-h960-rw",
        }} // Replace with your logo URL
        style={styles.logo}
      />

      <ThemedView style={styles.status}>
        <ThemedText style={styles.text}>Available</ThemedText>
        <ThemedText style={styles.text}>{portfolio.btcBalance} BTC</ThemedText>
        <ThemedText style={styles.text}>
          {formatCurrency(portfolio.eurBalance)}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
  },
  header: {
    height: 130,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  status: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },

  text: {
    textAlign: "right",
    lineHeight: 16,
    fontSize: 14,
    opacity: 0.8,
  },
});

export default Header;
