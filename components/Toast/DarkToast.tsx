import React from "react";
import { BaseToast, ToastConfig } from "react-native-toast-message";
import { StyleSheet } from "react-native";

export const darkToastConfig = {
  success: (props: ToastConfig) => (
    <BaseToast
      {...props}
      style={[styles.toastContainer]}
      text1Props={{ style: styles.text1 }}
      text2Props={{ style: styles.text2 }}
    />
  ),
  error: (props: ToastConfig) => (
    <BaseToast
      {...props}
      style={[styles.toastContainer]}
      text1Props={{ style: styles.text1 }}
      text2Props={{ style: styles.text2 }}
    />
  ),
  info: (props: ToastConfig) => (
    <BaseToast
      {...props}
      style={[styles.toastContainer]}
      text1Props={{ style: styles.text1 }}
      text2Props={{ style: styles.text2 }}
    />
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: "#1E1E1E",
  },
  text1: {
    color: "#FFFFFF",
  },
  text2: {
    color: "#CCCCCC",
  },
});
