const axios = require("axios");

class StockService {
  async getStockData() {
    const symbols = [
      "AAPL",
      "MSFT",
      "AMD",
      "PLAB",
      "FB",
      "GOOGL",
      "TSLA",
      "PLAB",
      "YI",
      "ADBE"
    ];
    const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote`;
    //const url = `https://www.worldtradingdata.com/api/v1/stock?symbol=${symbols}&api_token=mp0nGXOt7F5YXy3VxtjQ45xZZ0A4LMUFWSVyVjQ39bcwOzJOd800kwkQIhi5`;
    let response = await axios.get(url);

    let stockData = response.data;
    const data = Object.values(stockData);
    const stocks = data.map((item, index) => {
      return item.quote;
    });

    return stocks;
  }
}
module.exports = new StockService();
