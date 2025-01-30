import axios from "axios";

export const getBtcEurPrices = async (step = 3600, limit = 24) => {
  try {
    const response = await axios.get(
      "https://www.bitstamp.net/api/v2/ohlc/btceur/",
      {
        params: {
          step,
          limit,
        },
      }
    );
    return response.data.data.ohlc;
  } catch (error) {
    console.log("Error fetching BTC prices:", error);
    return null;
  }
};

export const getBtcEurTicker = async () => {
  try {
    const response = await axios.get(
      "https://www.bitstamp.net/api/v2/ticker/btceur/"
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching BTC ticker:", error);
    return null;
  }
};
