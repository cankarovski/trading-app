import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Ticker {
  timestamp: string;
  open: string;
  high: string;
  low: string;
  last: string;
  volume: string;
  vwap: string;
  bid: string;
  ask: string;
  side: string;
  open_24: string;
  percent_change_24: string;
}

interface TickerState {
  data: Ticker;
}

const initialState: TickerState = {
  data: {
    timestamp: "",
    open: "",
    high: "",
    low: "",
    last: "",
    volume: "",
    vwap: "",
    bid: "",
    ask: "",
    side: "",
    open_24: "",
    percent_change_24: "",
  },
};

const tickerSlice = createSlice({
  name: "ticker",
  initialState,
  reducers: {
    updateTicker(state, action: PayloadAction<Ticker>) {
      const { ...ticker } = action.payload;
      state.data = ticker;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("RESET_APP", () => initialState);
  },
});

export const { updateTicker } = tickerSlice.actions;

export default tickerSlice.reducer;
