import axios from "axios";
import setAuthToken from "../actions/utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./Categories";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/auth/user/register", userData)
    .then(() => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get User token
export const loginUser = userData => dispatch => {
  axios
    .post("/auth/user/login", userData)
    .then(res => {
      const { token } = res.data;
      // Set token to ls
      sessionStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// SOCIAL USER
export const socialRegisterUser = (userData, history) => dispatch => {
  axios
    .post("/auth/user/registersocial", userData)
    .then(res => {
      const { token } = res.data;
      // Set token to ls
      sessionStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err));
};

// Set logged in user
export const setCurrentUser = (decoded, dispatch) => {
  // dispatch(getCurrentProfile());
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};



// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from sessionStorage
  sessionStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
