import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TradeData } from "./tradesSlice";

interface Portfolio {
  btcBalance: number;
  eurBalance: number;
}

const initialState: Portfolio = {
  btcBalance: 0.0,
  eurBalance: 1000000.0,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    updatePortfolio(
      state,
      action: PayloadAction<{
        type: "buy" | "sell";
        price: number;
        amount: number;
      }>
    ) {
      const { type, price, amount } = action.payload;

      if (type === "buy") {
        const totalCost = price;

        if (state.eurBalance >= totalCost) {
          state.btcBalance += amount;
          state.eurBalance -= totalCost;
        } else {
          console.error("Insufficient EUR balance to execute trade");
        }
      } else if (type === "sell") {
        if (state.btcBalance >= amount) {
          state.btcBalance -= amount;
          state.eurBalance += price * amount;
        } else {
          console.error("Insufficient BTC balance to execute trade");
        }
      }
    },
    resetPortfolio(state) {
      state.btcBalance = initialState.btcBalance;
      state.eurBalance = initialState.eurBalance;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("RESET_APP", () => initialState);
  },
});

export const { updatePortfolio, resetPortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;
