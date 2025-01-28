import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Portfolio {
  btcBalance: number;
  usdBalance: number;
}

const initialState: Portfolio = {
  btcBalance: 0.0,
  usdBalance: 1000000.0,
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
        const totalCost = price * amount;

        if (state.usdBalance >= totalCost) {
          state.btcBalance += amount;
          state.usdBalance -= totalCost;
        } else {
          console.error("Insufficient USD balance to execute trade");
        }
      } else if (type === "sell") {
        if (state.btcBalance >= amount) {
          state.btcBalance -= amount;
          state.usdBalance += price * amount;
        } else {
          console.error("Insufficient BTC balance to execute trade");
        }
      }
    },
    resetPortfolio(state) {
      state.btcBalance = initialState.btcBalance;
      state.usdBalance = initialState.usdBalance;
    },
  },
});

export const { updatePortfolio, resetPortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;
