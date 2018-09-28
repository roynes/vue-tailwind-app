import * as constants from "../helpers";

function addGroup(details) {
  return axios.post(`${constants.baseUri}/groups`, details)
}

export default {
  addGroup
}