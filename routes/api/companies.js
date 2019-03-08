const express = require("express");
const router = express.Router();
const {
  getStocks,
  getAllCompanies,
  addCompany,
  deleteCompany
} = require("../../app/services/stockService");
const Error = require("../../app/models/error");

function prepareDocForClient(doc) {
  return {
    company: doc.company,
    ticker: doc.ticker,
    history: doc.history || [],
    categories: doc.categories || [],
    price_history: doc.price_history || {}
  };
}

/**
 * Retrieves the stock data
 */
router.get("/stocks", (req, res) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  getStocks()
    .then(stocks => {
      var prettyStocks = stocks.map(rawStock => {
        return prepareDocForClient(rawStock.doc);
      });
      res.send(prettyStocks);
    })
    .catch(error => {
      console.log(error);
      res.send(
        new Error("Stocks Error", "There was an error retrieving stocks")
      );
    });
});

/**
 * Retrieves the list of all companies
 */
router.get("/companies", (req, res) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  var companies = getAllCompanies();
  res.send(companies);
});

/**
 * Adds a company to the list of tracked companies
 */
router.post("/companies/add", (req, res) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  var companyName = req.body.name;
  console.log('Trying to add company "' + companyName + '"');
  addCompany(companyName)
    .then(result => {
      if (result) {
        res.send(prepareDocForClient(result));
      } else {
        res.send(
          new Error(
            "Add Error",
            "There was an error getting the new company data"
          )
        );
      }
    })
    .catch(error => {
      console.log(error);
      res.send(new Error("Add Error", error));
    });
});

/**
 * Deletes a company by name
 */
router.post("/companies/delete", (req, res) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  var companyName = req.body.name;
  console.log('Deleting company "' + companyName + '"');
  deleteCompany(companyName);
  res.send(companyName);
});

module.exports = router;
