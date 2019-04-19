const express = require("express");
const router = express.Router();
const { getCompanyData } = require("../../services/companyDataService");
const { getStockData } = require("../../services/stockService");
const {
  getCompanyInfo,
  getChartData,
  getCompanySentiment
} = require("../../services/companyInfoService");
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
 * retrieves Company news based on passed symbol
 */
router.post("/companyInfo", async (req, res) => {
  const symbol = req.body.symbol;
  // console.log(symbol);
  var companyInfo = await getCompanyInfo(symbol);
  res.send(companyInfo);
});
/**
 * Retreives chart data of a given company
 */
router.post("/chartData", async (req, res) => {
  const symbol = req.body.symbol;
  var chartData = await getChartData(symbol);
  res.send(chartData);
});
/**
 * Retrieves sentiment data of a given company
 */
router.post("/sentimentData", async (req, res) => {
  const symbol = req.body.symbol;
  var sentimentData = await getCompanySentiment(symbol);

  res.send(sentimentData);
});
module.exports = router;
