const axios = require("axios");

class StockService {
  async getStockData() {
    const url =
      "https://www.worldtradingdata.com/api/v1/stock?symbol=AAPL,MSFT,HSBA.L&api_token=mp0nGXOt7F5YXy3VxtjQ45xZZ0A4LMUFWSVyVjQ39bcwOzJOd800kwkQIhi5";
    let res = await axios.get(url);

    let stockData = res.data;
    return stockData;
  }
}
module.exports = new StockService();
