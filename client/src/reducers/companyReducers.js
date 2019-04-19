import {
  GET_COMPANIES,
  GET_STOCKS,
  GET_COMPANYINFO,
  GET_CHARTDATA,
  GET_SENTIMENT
} from "../actions/types";

const initialState = {
  companies: [],
  stocks: [],
  companyInfo: [],
  chartData: [],
  sentimentData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload
      };
    case GET_COMPANYINFO:
      return {
        ...state,
        companyInfo: action.payload
      };
    case GET_STOCKS:
      return {
        ...state,
        stocks: action.payload
      };
    case GET_CHARTDATA:
      return {
        ...state,
        chartData: action.payload
      };
    case GET_SENTIMENT:
      return {
        ...state,
        sentimentData: action.payload
      };

    default:
      return state;
  }
}
