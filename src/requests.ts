import axios from 'axios';

export const getCityList = () => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/cities`)
    .then((response) => response.data);
};
