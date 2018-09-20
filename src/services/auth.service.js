import * as constants from '../helpers'

/**
 * @param {*} credentials
 */
function authenticate(credentials) {
  return axios.post(`${constants.baseUri}/login`, credentials);
}

function logout(normal = false) {
  let endPoint = normal ? 'logout' : 'relogin-as';

  return axios.post(`${constants.baseUri}/${endPoint}`);
}

function authAs(id, type) {
  return axios.post(`${constants.baseUri}/login-as`, { type, id });
}

export default {
  authenticate,
  logout,
  authAs
}
