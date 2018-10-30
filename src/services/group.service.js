import * as constants from "../helpers";

function all() {
  return axios.get(`${constants.baseUri}/groups`);
}

function add(details) {
  return axios.post(`${constants.baseUri}/groups`, details);
}

function update(details, id) {
  return axios.patch(`${constants.baseUri}/groups/${id}`, details);
}

function remove(id) {
  return axios.delete(`${constants.baseUri}/groups/${id}`);
}

export default {
  add,
  remove,
  all,
  update
};
