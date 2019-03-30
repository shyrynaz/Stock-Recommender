const express = require("express");
const router = express.Router();
const { getCompanyData } = require("../../services/companyDataService");
const { getStockData } = require("../../services/stockService");
/**
 * Retrieves the stock data
 */
router.get("/stocksData", async (req, res) => {
  var stockData = await getStockData();
  res.send(stockData);
});

/**
 * Retrieves the list of all companies
 */
router.get("/companyNames", (req, res) => {
  var companiesData = getCompanyData();
  res.send(companiesData);
});

module.exports = router;
