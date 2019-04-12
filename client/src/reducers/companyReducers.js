import { GET_COMPANIES, GET_STOCKS, GET_COMPANYINFO } from "../actions/types";

const initialState = {
  companies: [],
  stocks: [],
  companyInfo: []
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
    default:
      return state;
  }
}
