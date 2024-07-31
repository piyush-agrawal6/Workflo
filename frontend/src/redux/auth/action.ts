import axios from "axios";
import { Dispatch } from "redux";
import {
  SIGNUP_ERROR,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  RESET_ERROR,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "./actionTypes";
const BASE_URI = process.env.NEXT_PUBLIC_API_URL;

export interface registerData {
  name: string;
  email: string;
  password: string;
}

interface loginData {
  email: string;
  password: string;
}

export const registerUser =
  (data: registerData, callback: any) => async (dispatch: Dispatch) => {
    dispatch({ type: SIGNUP_LOADING });
    try {
      let userData = await axios.post(`${BASE_URI}/auth/register`, data);
      dispatch({ type: SIGNUP_SUCCESS, payload: userData.data });
      callback();
      localStorage.setItem("token", JSON.stringify(userData.data.token));
    } catch (e: any) {
      if (e.response.data.message == "User already registered") {
        dispatch({
          type: SIGNUP_ERROR,
          payload: { errorMessage: "User already registered" },
        });
      } else {
        dispatch({
          type: SIGNUP_ERROR,
          payload: { errorMessage: "Something went wrong" },
        });
      }
    }
  };

export const loginUser =
  (data: loginData, callback: any) => async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_LOADING });
    try {
      let res = await axios.post(`${BASE_URI}/auth/login`, data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      callback();
      localStorage.setItem("token", JSON.stringify(res.data.token));
    } catch (e: any) {
      if (e.response.data.message == "User not found") {
        dispatch({
          type: LOGIN_ERROR,
          payload: { errorMessage: "User not found" },
        });
      } else if (e.response.data.message == "Invalid credentials") {
        dispatch({
          type: LOGIN_ERROR,
          payload: { errorMessage: "Invalid credentials" },
        });
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: { errorMessage: "Something went wrong" },
        });
      }
    }
  };

//! get user details

export const getUserDetails = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_USER_LOADING });
  try {
    let userDetails = await axios(`${BASE_URI}/auth/userDetails`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token") as string),
      },
    });

    dispatch({ type: GET_USER_SUCCESS, payload: userDetails.data });
  } catch (error) {
    dispatch({
      type: GET_USER_ERROR,
      payload: { errorMessage: "Something went wrong" },
    });
  }
};

//! logout users

export const logout = () => (dispatch: Dispatch) => {
  localStorage.setItem("token", "");
  dispatch({ type: LOGOUT_SUCCESS });
};

// reset error
export const resetError = () => ({
  type: RESET_ERROR,
});
