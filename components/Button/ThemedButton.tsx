import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";

type ThemedButtonProps = {
  type?: "primary" | "secondary";
  text: string;
  pressHandler: () => void;
};

export default function ThemedButton({
  text,
  type = "primary",
  pressHandler,
}: ThemedButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "primary" ? styles.primary : undefined,
        type === "secondary" ? styles.secondary : undefined,
      ]}
      onPress={pressHandler}
      activeOpacity={0.7}
    >
      <ThemedText type="subtitle">{text}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#4CAF50",
  },
  secondary: {
    backgroundColor: "#2196F3",
  },
});
