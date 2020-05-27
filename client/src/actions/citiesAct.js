import axios from "axios";
import { FETCH_CITIES } from "./Categories";

export const fetchCities = () => dispatch => {
  axios.get(`/api/city/`).then(res => {
    dispatch({
      type: FETCH_CITIES,
      payload: res.data
    });
  });
};
