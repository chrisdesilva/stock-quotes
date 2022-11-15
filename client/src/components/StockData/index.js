import React from "react";
import cn from "classnames";
import { number, shape, string } from "prop-types";

import "./StockData.css";

/**
 * Displays information about stock entered in input
 *
 * @param errorMsg - message to communicate an error from the request
 * @param stock - object containing all information about stock entered in input
 */
const StockData = ({ errorMsg, stock }) => {
  return (
    <div className="root">
      {errorMsg ? (
        <p>{errorMsg}</p>
      ) : (
        <div>
          {Object.entries(stock).map((item) => {
            const [label, value] = item;

            return (
              <div key={label} className="row">
                <p>{label}</p>
                <p
                  className={cn({
                    value: true,
                    green: value > 0,
                    red: value < 0,
                  })}
                >
                  {value}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

StockData.propTypes = {
  errorMsg: string,
  stock: shape({
    Change: number,
    "Current price": number,
    "High price of the day": number,
    "Low price of the day": number,
    "Open price of the day": number,
    "Percent change": number,
    "Previous close price": number,
    "Last updated": string,
  }).isRequired,
};

export default StockData;
