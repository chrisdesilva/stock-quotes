import React from "react";

import { bool, func } from "prop-types";

import "./StockInput.css";

/**
 * Form component for fetching stock quote information
 *
 * @param loading - if true, network request is currently in flight
 * @param handleChangeSymbol - updates the stock symbol to be sent to the API
 * @param handleGetStockQuote - fetches the data for the given symbol
 */
const StockInput = ({ handleChangeSymbol, handleGetStockQuote, loading }) => (
  <form className="root" onSubmit={handleGetStockQuote}>
    <p>Enter a stock symbol to find the latest information.</p>
    <label htmlFor="symbol">Symbol</label>
    <input
      id="symbol"
      name="symbol"
      onChange={handleChangeSymbol}
      placeholder="Enter stock symbol"
      required
      type="text"
    />
    <button className="button" disabled={loading} type="submit">
      {loading ? "Fetching quote..." : "Fetch quote"}
    </button>
  </form>
);

StockInput.propTypes = {
  loading: bool.isRequired,
  handleChangeSymbol: func.isRequired,
  handleGetStockQuote: func.isRequired,
};

export default StockInput;
