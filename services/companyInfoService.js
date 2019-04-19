const axios = require("axios");
class CompanyInfoService {
  /**
   * fetching news articles of given symbol
   */
  async getCompanyInfo(symbol) {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/news`;
    let response = await axios.get(url);
    const companyInfo = response.data;
    // console.log(companyInfo);
    return companyInfo;
  }

  /**
   *
   * @param {*} symbol
   * fetching price chart data of a given symbol
   */

  async getChartData(symbol) {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/chart/1m`;

    let response = await axios.get(url);
    const chartData = response.data;
    // console.log(chartData);
    return chartData;
  }

  /**
   * fetching sentiment data of a given company symbol
   */
  async getCompanySentiment(symbol) {
    const sentimentApiKey = "8fd260bdc4d7da3d8f3b7dd6b4d28c30";
    const url = `http://api.stockfluence.com/fund/${symbol}?apikey=${sentimentApiKey}`;

    let response = await axios.get(url);
    const sentimentData = response.data;

    return sentimentData;
  }
}
module.exports = new CompanyInfoService();
