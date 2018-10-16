import * as constants from "../helpers";

function add(details) {
  return axios.post(`${constants.baseUri}/register`, details);
}

export default {
  add
};