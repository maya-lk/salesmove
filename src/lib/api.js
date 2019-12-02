import axios from 'axios';

export default axios.create({
  baseURL: `http://www.saleseazy.com/wp/wp-json/salesmove/v1/`//Rest API URL
});

export const accountAPI = axios.create({
  baseURL: `http://www.saleseazy.com/wp/wp-json/simple-jwt-authentication/v1/`//Rest API URL
});