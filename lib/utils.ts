import { TradeData } from "./store/tradesSlice";

export const getLastPrice = (prices: []) => {
  return prices[prices.length - 1];
};

export const formatTime = (timestamp: string) => {
  const date = new Date(parseInt(timestamp, 10));
  const hours = String(date.getHours()).padStart(2, "0"); // Adds leading zero if needed
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Adds leading zero if needed
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
        // Add the cost of the buy to the total buy cost
        acc.totalBuyCost += parseFloat(trade.price) * parseFloat(trade.amount);
        acc.totalQuantity += parseFloat(trade.amount);
      } else if (trade.type === "sell") {
        // Add the revenue from the sell to the total sell revenue
        acc.totalSellRevenue +=
          parseFloat(trade.price) * parseFloat(trade.amount);
        acc.totalQuantity -= parseFloat(trade.amount); // Decrease the remaining quantity
      }
      return acc;
    },
    { totalBuyCost: 0, totalSellRevenue: 0, totalQuantity: 0 }
  );
};
