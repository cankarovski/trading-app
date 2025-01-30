import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TradeButton from "../Button/TradeButton";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

import { ThemedView } from "../ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AppColors } from "@/constants/Colors";

interface TradeDialogProps {
  visible: boolean;
  onClose: () => void;
}

const TradeDialog: React.FC<TradeDialogProps> = ({ visible, onClose }) => {
  const [eurPrice, setEurPrice] = useState("");
  const [btcPrice, setBtcPrice] = useState("");

  const theme = useColorScheme();

  const ticker = useSelector((state: RootState) => state.ticker.data);

  const btcIndex = ticker?.last;

  const closeHandler = () => {
    setEurPrice("");
    setBtcPrice("");
    onClose();
  };

  const syncInputs = (value: string, type: "eur" | "btc") => {
    const btcIndexNum = parseFloat(btcIndex);
    if (value == null || value === "") {
      setEurPrice("");
      setBtcPrice("");
      return;
    }
    value = value.replace(",", ".");
    value = value.replace(/(\..*?)\./g, "$1");

    const regex = /^[0-9.]*$/;
    if (!regex.test(value)) {
      return;
    }

    if (type === "eur") {
      setEurPrice(value);
      const valueNum = parseFloat(value);
      setBtcPrice((valueNum / btcIndexNum).toPrecision(7).toString());
      return;
    }
    if (type === "btc") {
      setBtcPrice(value);
      const valueNum = parseFloat(value);
      setEurPrice((valueNum * btcIndexNum).toPrecision(7).toString());
      return;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.dialog}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons
              style={theme === "dark" ? styles.light : undefined}
              name="close"
              size={24}
              color={theme === "dark" ? "#FFF" : "black"}
            />
          </TouchableOpacity>

          <View
            style={[
              styles.inputRow,
              theme === "dark"
                ? { backgroundColor: "rgba(255,255,255,0.1)" }
                : undefined,
            ]}
          >
            <TextInput
              style={[
                styles.input,
                theme === "dark" ? styles.light : undefined,
              ]}
              value={eurPrice}
              onChangeText={(value) => syncInputs(value, "eur")}
              keyboardType="decimal-pad"
            />
            <Text style={[styles.inputText]}>EUR</Text>
          </View>

          <View
            style={[
              styles.inputRow,
              theme === "dark"
                ? { backgroundColor: "rgba(255,255,255,0.1)" }
                : undefined,
            ]}
          >
            <TextInput
              style={[
                styles.input,
                theme === "dark" ? styles.light : undefined,
              ]}
              value={btcPrice}
              onChangeText={(value) => syncInputs(value, "btc")}
              keyboardType="decimal-pad"
            />
            <Text style={[styles.inputText]}>BTC</Text>
          </View>

          <View style={styles.actions}>
            <TradeButton
              type="buy"
              price={eurPrice}
              amount={btcPrice}
              onSubmit={closeHandler}
              width={126}
            />
            <TradeButton
              type="sell"
              price={eurPrice}
              amount={btcPrice}
              onSubmit={closeHandler}
              width={126}
            />
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  light: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  dialog: {
    width: Dimensions.get("window").width - 48,
    borderRadius: 12,
    padding: 24,
    paddingTop: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 20,
  },
  inputRow: {
    height: 48,
    borderRadius: 4,
    backgroundColor: AppColors.background,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
    padding: 12,
  },
  input: {
    borderWidth: 0,
    borderColor: "transparent",
    textAlign: "right",
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.24)",
  },
  inputText: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: 700,
    color: AppColors.secondaryAccent,
  },

  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  actions: {
    marginTop: 12,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
  },
});

export default TradeDialog;
