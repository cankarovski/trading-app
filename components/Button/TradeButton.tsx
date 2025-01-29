import React from "react";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { makeTrade } from "@/lib/store/tradesSlice";
import ThemedButton from "./ThemedButton";
import useToast from "@/hooks/useToast";

type TradeButtonProps = {
  type: "buy" | "sell";
  price: string;
  amount: string;
  onSubmit?: () => void;
};

export default function TradeButton({
  type,
  price,
  amount,
  onSubmit,
}: TradeButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const trade = { type, price, amount };

  const pressHandler = () => {
    if (!price || !amount) {
      toast({
        type: "info",
        text1: "Please input amount/price",
      });
      return;
    }
    dispatch(makeTrade(trade))
      .unwrap()
      .then((trade) => {
        toast({
          type: "success",
          text1: "Trade was successful!",
          text2: `${trade.type === "buy" ? "Bought" : "Sold"} ${
            trade.amount
          } BTC for ${trade.price} €`,
        });
      })
      .catch((error: string) => {
        toast({
          type: "error",
          text1: "Error",
          text2: error,
        });
      });
    if (onSubmit) {
      onSubmit();
    }
  };

  return <ThemedButton text={type} pressHandler={pressHandler} />;
}
