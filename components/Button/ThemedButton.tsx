import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { AppColors } from "@/constants/Colors";

type ThemedButtonProps = {
  type?: "primary" | "secondary";
  text: string;
  width?: number;
  pressHandler: () => void;
};

export default function ThemedButton({
  text,
  type = "primary",
  width,
  pressHandler,
}: ThemedButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "primary" ? styles.primary : undefined,
        type === "secondary" ? styles.secondary : undefined,
        width ? { width } : undefined,
      ]}
      onPress={pressHandler}
      activeOpacity={0.7}
    >
      <ThemedText style={styles.text}>{text}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.button,
    height: 48,
    paddingHorizontal: 40,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
    color: "white",
  },
  primary: {
    backgroundColor: AppColors.button,
  },
  secondary: {
    backgroundColor: AppColors.button,
  },
});
