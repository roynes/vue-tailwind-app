import * as constants from "../helpers";

function fetchAll() {
  return axios.get(`${constants.baseUri}/states`);
}

export default {
  fetchAll
}