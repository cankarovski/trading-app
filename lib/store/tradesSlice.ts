import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { updatePortfolio } from "./portfolioSlice";
import { RootState } from ".";

export interface TradeData {
  timestamp?: string;
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
  extraReducers: (builder) => {
    builder.addCase("RESET_APP", () => initialState);
    builder.addCase(makeTrade.fulfilled, (state, action) => {
      addTrade(action.payload); // Adding the trade if makeTrade is fulfilled
    });
  },
});

export const makeTrade = createAsyncThunk<
  TradeData,
  TradeData,
  { rejectValue: string }
>(
  "trades/makeTrade",
  async (trade: TradeData, { dispatch, getState, rejectWithValue }) => {
    const state = getState(); // Get the state of the store
    const portfolio = (state as RootState).portfolio;

    const { amount, price, type } = trade;

    // Check if the portfolio has enough balance before adding a trade
    if (
      (type === "buy" && portfolio.eurBalance >= parseFloat(price)) ||
      (type === "sell" && portfolio.btcBalance >= parseFloat(amount))
    ) {
      dispatch(addTrade(trade));
      dispatch(
        updatePortfolio({
          type: trade.type,
          price: parseFloat(trade.price),
          amount: parseFloat(trade.amount),
        })
      );
      return trade;
    } else {
      return rejectWithValue("Insufficient balance");
    }
  }
);

export const { addTrade, clearTrades } = tradesSlice.actions;
export default tradesSlice.reducer;
