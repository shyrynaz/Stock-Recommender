import axios from "axios";

import { GET_COMPANIES, GET_STOCKS, GET_COMPANYINFO } from "./types";

//getting a list of all companies
export const getCompanies = () => dispatch => {
  axios
    .get("api/companies/companyNames")
    .then(res =>
      dispatch({
        type: GET_COMPANIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COMPANIES,
        payload: null
      })
    );
};

//getting company info
export const getCompanyInfo = companyData => dispatch => {
  console.log(companyData);
  axios
    .post("api/companies/companyInfo", companyData)
    .then(res =>
      dispatch({
        type: GET_COMPANYINFO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COMPANYINFO,
        payload: null
      })
    );
};

// get the stocks data of the added companies;
export const getStocks = () => dispatch => {
  axios
    .get("api/companies/stockData")
    .then(res =>
      dispatch({
        type: GET_STOCKS,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_STOCKS,
        payload: null
      })
    );
};
