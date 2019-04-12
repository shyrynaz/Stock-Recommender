const express = require("express");
const router = express.Router();
const { getCompanyData } = require("../../services/companyDataService");
const { getStockData } = require("../../services/stockService");
const { getCompanyInfo } = require("../../services/companyInfoService");
/**
 * Retrieves the stock data
 */
router.get("/stockData", async (req, res) => {
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

/**
 * retrieves Company info i.e news and chart data
 */
router.post("/companyInfo", async (req, res) => {
  const symbol = req.body.symbol;
  // console.log(symbol);
  var companyInfo = await getCompanyInfo(symbol);
  res.send(companyInfo);
});

module.exports = router;
