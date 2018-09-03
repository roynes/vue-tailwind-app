let baseUri = process.env.VUE_APP_API_BASE_URI;
let salt = process.env.VUE_APP_SALT;
let tokenAlias = btoa(`${salt}::token`);
/**
 * Logs in a specific user and returns a Promise
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
let login = (email, password) => {
  return axios
    .post(`${baseUri}/login`, {
      email,
      password
    })
    .then(resp => {
      //Store to local storage
      localStorage.setItem(tokenAlias, resp.data.token);
      //Put to the common headers of Axios
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem(tokenAlias)}`;

      return resp;
    });
};

/**
 * Logs out the current user
 *
 * @returns {Promise}
 */
let logout = () => {
  return axios
    .post(`${baseUri}/logout`)
    .then(resp => {
      delete axios.defaults.headers.common["Authorization"];
    });
};

export const AuthService = {
  login,
  logout
};
