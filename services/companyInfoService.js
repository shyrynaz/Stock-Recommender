const axios = require("axios");
class CompanyInfoService {
  async getCompanyInfo(symbol) {
    const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbol}&types=news,chart&range=1m&last=5`;
    let response = await axios.get(url);
    let data = Object.values(response.data);
    const companyInfo = data.map(item => {
      return item.news;
    });
    // console.log(companyInfo);
    return companyInfo;
  }
}
module.exports = new CompanyInfoService();
