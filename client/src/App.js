import React, { useState } from "react";

import axios from "axios";

import StockInput from "./components/StockInput";
import StockData from "./components/StockData";

import "./App.css";

const App = () => {
  const [stockInfo, setStockInfo] = useState({});
  const [symbol, setSymbol] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const mapKeysToLabels = (obj) => ({
    "Current price": obj.c,
    Change: obj.d,
    "Percent change": obj.dp,
    "High price of the day": obj.h,
    "Low price of the day": obj.l,
    "Open price of the day": obj.o,
    "Previous close price": obj.pc,
    "Last updated": new Date().toLocaleString(),
  });

  const handleGetStockQuote = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const { data } = await axios.get("api/quote", {
        params: { symbol },
      });
      const formatted = mapKeysToLabels(data);
      setStockInfo(formatted);
      setErrorMsg("");
    } catch (e) {
      const { data } = e.response;
      setErrorMsg(data);
      console.error(e);
    }
    setLoading(false);
  };

  const handleChangeSymbol = (e) => {
    const { value } = e.target;
    setSymbol(value);
  };

  return (
    <div className="App">
      <h1>Stock Ticker</h1>
      <StockInput
        loading={loading}
        handleChangeSymbol={handleChangeSymbol}
        handleGetStockQuote={handleGetStockQuote}
      />
      <StockData errorMsg={errorMsg} stock={stockInfo} />
    </div>
  );
};

export default App;
