import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PriceData {
  timestamp: string;
  open: string;
  high: string;
  low: string;
  close: string;
}

interface PriceState {
  data: PriceData[];
}

const initialState: PriceState = {
  data: [],
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPriceData(state, action: PayloadAction<PriceData[]>) {
      state.data = action.payload;
    },
  },
});

export const { setPriceData } = priceSlice.actions;
export default priceSlice.reducer;
