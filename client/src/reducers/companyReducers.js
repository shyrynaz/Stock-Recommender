import {
  ADD_COMPANY,
  DELETE_COMPANY,
  GET_COMPANIES,
  GET_STOCKS
} from "../actions/types";

const initialState = {
  companies: [],
  stocks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload
      };
    case ADD_COMPANY:
      return {
        ...state,
        companies: [action.payload, ...state.companies]
      };
    case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(
          company => company.name !== action.payload
        )
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
