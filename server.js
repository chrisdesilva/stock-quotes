const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors"),
  axios = require("axios");

require("dotenv").config();
app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

async function fetchQuote(symbol) {
  // API requires symbols to be uppercase
  const formatted = symbol.toUpperCase();
  const url = `https://finnhub.io/api/v1/quote?symbol=${formatted}&token=${process.env.FINNHUB_KEY}`;
  const response = await axios.get(url);
  return response.data;
}

app.get("/api/quote", (req, res) => {
  const { symbol } = req.query;
  const result = fetchQuote(symbol).then((data) => {
    // Finnhub returns a 200 even for symbols that don't exist. Send a 400 if we don't have data.d (daily change information)
    if (data.d === null) {
      res.status(404).send("Unable to find stock information for that symbol");
      return;
    }
    res.json(data);
  });
  return result;
});
