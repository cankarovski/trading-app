import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast, { BaseToast, ToastType } from "react-native-toast-message";
import { StyleSheet, Text, View } from "react-native";

type ToastProps = {
  type: ToastType;
  text1: string;
  text2?: string;
  time?: number;
};

export default function useToast() {
  const insets = useSafeAreaInsets();

  const toast = ({ type, text1, text2, time = 3000 }: ToastProps) => {
    Toast.show({
      type,
      text1,
      text2,
      position: "top", // You can change to 'bottom' or 'center'
      visibilityTime: time, // Duration in ms
      topOffset: insets.top, // Add the safe area top padding
    });
  };

  return toast;
}
