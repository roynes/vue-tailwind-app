import * as constants from "../helpers";

function add(details) {
  return axios.post(`${constants.baseUri}/groups`, details);
}

function remove(id) {
  return axios.delete(`${constants.baseUri}/groups/${id}`);
}

export default {
  add, remove
}