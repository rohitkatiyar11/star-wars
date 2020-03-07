import * as types from "./actionTypes";
import axios from "axios";
import config from "../config";

// Its a noraml login check because we are already exposing whole list of people
const checkLoginUser = (username, password, users) => {
  return users.some(
    item => item.name === username && item.birth_year === password
  );
};

//Get total searches
const getTotalSearches = (isLoggedIn, username) => {
  if (isLoggedIn) {
    return config.username === username ? 1000 : config.maxSearches;
  }
  return 0;
};

export const loginAction = (username, password) => dispatch => {
  return axios
    .get(config.endpoint + "people/?format=json")
    .then(res => {
      const isLoggedIn = checkLoginUser(
        username,
        password,
        res.data.results || []
      );
      localStorage.setItem(
        "payload",
        JSON.stringify({
          isLoggedIn,
          totalSearches: getTotalSearches(isLoggedIn, username),
          username
        })
      );
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { isLoggedIn }
      });
    })
    .catch(err => {
      localStorage.setItem(
        "payload",
        JSON.stringify({
          isLoggedIn: false,
          totalSearches: 0
        })
      );
      dispatch({
        type: types.LOGIN_ERROR,
        payload: err
      });
    });
};

export const getPlanetsAction = searchString => dispatch => {
  return axios
    .get(config.endpoint + "planets/?format=json&search=" + searchString)
    .then(res => {
      dispatch({
        type: types.GET_PLANETS_SUCCESS,
        payload: res.data.results
      });
    })
    .catch(err => {
      dispatch({
        type: types.GET_PLANETS_ERROR,
        payload: err
      });
    });
};
