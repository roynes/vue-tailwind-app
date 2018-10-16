import * as constants from "../helpers";

function add(details) {
  return axios.post(`${constants.baseUri}/clients`, details);
}

function remove(id) {
  return axios.delete(`${constants.baseUri}/clients/${id}`);
}

function all() {
  return axios.get(`${constants.baseUri}/clients/all`)
}

export default {
  add, remove, all
}