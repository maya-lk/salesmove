import axios from 'axios';

export default axios.create({
  baseURL: `https://mayaprojects.net/salesmove/wp-json/salesmove/v1/`//Rest API URL
});