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
    if (!value) {
      setEurPrice("");
      setBtcPrice("");
      return;
    }

    const regex = /^(\d+(\.\d{0,2})?)$/;
    value = value.replace(",", ".");
    if (!regex.test(value)) {
      return;
    }

    if (type === "eur") {
      setEurPrice(value);
      const valueNum = parseFloat(value);
      setBtcPrice((valueNum / btcIndexNum).toPrecision(6).toString());
      return;
    }
    if (type === "btc") {
      setBtcPrice(value);
      const valueNum = parseFloat(value);
      setEurPrice((valueNum * btcIndexNum).toPrecision(6).toString());
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

          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.input,
                theme === "dark" ? styles.light : undefined,
              ]}
              value={eurPrice}
              onChangeText={(value) => syncInputs(value, "eur")}
              keyboardType="decimal-pad"
            />
            <Text
              style={[
                styles.inputText,
                theme === "dark" ? styles.light : undefined,
              ]}
            >
              EUR
            </Text>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.input,
                theme === "dark" ? styles.light : undefined,
              ]}
              value={btcPrice}
              onChangeText={(value) => syncInputs(value, "btc")}
              keyboardType="decimal-pad"
            />
            <Text
              style={[
                styles.inputText,
                theme === "dark" ? styles.light : undefined,
              ]}
            >
              BTC
            </Text>
          </View>

          <View style={styles.actions}>
            <TradeButton
              type="buy"
              price={eurPrice}
              amount={btcPrice}
              onSubmit={closeHandler}
            />
            <TradeButton
              type="sell"
              price={eurPrice}
              amount={btcPrice}
              onSubmit={closeHandler}
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
    width: Dimensions.get("window").width - 40,
    borderRadius: 10,
    padding: 10,
    paddingTop: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "90%",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
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
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

export default TradeDialog;
