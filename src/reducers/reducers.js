import * as types from "../actions/actionTypes";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        data: action.payload
      };
    default:
      return state;
  }
};

export const planets = (state = {}, action) => {
  switch (action.type) {
    case types.GET_PLANETS_SUCCESS:
      return {
        data: action.payload
      };
    default:
      return state;
  }
};
