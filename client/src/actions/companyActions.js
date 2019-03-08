import axios from "axios";

import {
  ADD_COMPANY,
  DELETE_COMPANY,
  GET_COMPANIES,
  GET_STOCKS
} from "./types";

//getting a list of all companies
export const getCompanies = () => dispatch => {
  axios
    .get("api/companies/companies")
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

//adding a company to be tracked
export const addCompany = companyData => dispatch => {
  const companies = companyData.companies;
  axios
    .post("api/companies/companies/add", companyData)
    .then(res =>
      dispatch({
        type: ADD_COMPANY,
        payload: res.data
      })
    )
    .then(data =>
      companies ? dispatch(getStocks(companies.concat(data.payload))) : null
    )
    .catch(err => console.log(err));
};

//deleting a company from a list of tracked companies
export const deleteCompany = companyData => dispatch => {
  if (window.confirm("Do yo want to remove this company?")) {
    const name = companyData.companyName;

    const newCompanies = companyData.companies.filter(
      company => company.name !== name
    );
    axios
      .delete("/api/companies/companies/delete")
      .then(res =>
        dispatch({
          type: DELETE_COMPANY,
          payload: name
        })
      )
      .then(newCompanies ? dispatch(getStocks(newCompanies)) : null)
      .catch(err => console.log(err));
  }
};

// get the stocks data of the added companies;
export const getStocks = companyData => dispatch => {
  axios
    .get("api/companies/stocks", companyData)
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
