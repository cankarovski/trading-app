import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { updatePortfolio } from "./portfolioSlice";
import { AppDispatch } from ".";

export interface TradeData {
  timestamp: string;
  price: string;
  amount: string;
  type: "buy" | "sell";
}

interface TradeState {
  data: TradeData[];
}

const initialState: TradeState = {
  data: [],
};

const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    addTrade: {
      reducer: (state, action: PayloadAction<TradeData>) => {
        state.data.unshift(action.payload);
      },
      prepare: ({
        amount,
        price,
        type,
      }: {
        amount: string;
        price: string;
        type: "buy" | "sell";
      }) => {
        const timestamp = Date.now().toString();
        return { payload: { timestamp, amount, price, type } };
      },
    },
    clearTrades(state) {
      state.data = [];
    },
  },
});

// Thunk to add trade and update user portfolio
export const invokeTrade = (trade: {
  price: string;
  amount: string;
  type: "buy" | "sell";
}) => {
  return (dispatch: AppDispatch) => {
    dispatch(tradesSlice.actions.addTrade(trade));
    dispatch(
      updatePortfolio({
        type: trade.type,
        price: parseFloat(trade.price),
        amount: parseFloat(trade.amount),
      })
    );
  };
};

export const { addTrade, clearTrades } = tradesSlice.actions;
export default tradesSlice.reducer;
