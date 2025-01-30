import { TradeData } from "./store/tradesSlice";

export const getLastPrice = (prices: []) => {
  return prices[prices.length - 1];
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatTime = (timestamp: string) => {
  const date = new Date(parseInt(timestamp, 10));
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatCurrency = (
  amount: string | number,
  currency = "EUR",
  locale = "sl-SI"
) => {
  if (!amount) return "";
  const val = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    val
  );
};

export const calculateTotalPnL = (trades: TradeData[]) => {
  return trades.reduce(
    (acc, trade) => {
      if (trade.type === "buy") {
        acc.totalBuyCost += parseFloat(trade.price) * parseFloat(trade.amount);
        acc.totalQuantity += parseFloat(trade.amount);
      } else if (trade.type === "sell") {
        acc.totalSellRevenue +=
          parseFloat(trade.price) * parseFloat(trade.amount);
        acc.totalQuantity -= parseFloat(trade.amount);
      }
      return acc;
    },
    { totalBuyCost: 0, totalSellRevenue: 0, totalQuantity: 0 }
  );
};
