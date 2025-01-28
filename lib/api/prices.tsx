import axios from "axios";

export const getBtcUsdPrices = async (step = 3600, limit = 24) => {
  try {
    const response = await axios.get(
      "https://www.bitstamp.net/api/v2/ohlc/btcusd/",
      {
        params: {
          step,
          limit,
        },
      }
    );
    console.log("data", response.data.data.ohlc);
    return response.data.data.ohlc;
  } catch (error) {
    console.error("Error fetching BTC data:", error);
    return null;
  }
};
