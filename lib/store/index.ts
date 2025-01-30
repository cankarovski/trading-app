import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import priceReducer from "./priceSlice";
import tradesReducer from "./tradesSlice";
import portfolioReducer from "./portfolioSlice";
import tickerReducer from "./tickerSlice";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  price: priceReducer,
  trades: tradesReducer,
  portfolio: portfolioReducer,
  ticker: tickerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
