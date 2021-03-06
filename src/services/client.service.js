import * as constants from "../helpers";

function add(details) {
  return axios.post(`${constants.baseUri}/client`, details);
}

function remove(id) {
  return axios.delete(`${constants.baseUri}/clients/${id}`);
}

function update(details, id) {
  return axios.patch(`${constants.baseUri}/client/${id}`, details);
}

function all() {
  return axios.get(`${constants.baseUri}/clients/all`);
}

export default {
  add,
  remove,
  all,
  update
};
