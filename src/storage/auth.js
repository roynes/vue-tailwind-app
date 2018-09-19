import * as constants from "../helpers";
import { SET_CUR_USER } from "./user";

export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_EXP = "UPDATE_EXP";
export const AUTHENTICATE = "AUTHENTICATE";
export const UNAUTHENTICATED = "UNAUTHENTICATED";
export const UNAUTHENTICATE = "UNAUTHENTICATE";
export const AUTHENTICATE_AS = "AUTHENTICATE_AS";
export const UPDATE_LOGIN_AS_TOKEN = "UPDATE_LOGIN_AS_TOKEN";

const state = {
  token: constants.loginAsToken || constants.token,
  expires_in: constants.tokenExpiration,
};

const mutations = {
  [UPDATE_TOKEN]: (state, token = "", sub = false) => {
    if(!sub) constants.setToken(token);
    else constants.setLoginAsToken(token);

    state.token = token;

    axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
  },
  [UPDATE_EXP]: (state, expiry = 0) => {
    constants.setTokenExpiry(expiry);
    state.expires_in = expiry;
  },
  [UPDATE_LOGIN_AS_TOKEN]: (state, token = "") => {
    constants.setLoginAsToken(token);
    state.token = token;
    axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
  }
};

const actions = {
  [AUTHENTICATE]: ({ commit }, credentials) => {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.baseUri + "/login", credentials)
        .then(resp => {
          commitMutation(commit, resp.data);

          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  [UNAUTHENTICATE]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.baseUri + "/logout")
        .then(resp => {
          //Todo: Debug starts here <<<<==================
          console.log('logged out called');
          console.log(!! constants.loginAsToken);

          if(!! constants.loginAsToken) {
            commitMutation(commit, constants.token, true);
          } else {
            commitMutation(commit);
            commit(`user/${SET_CUR_USER}`, null, { root: true });

            delete axios.defaults.headers.common["Authorization"];
          }

          resolve(resp);
        })
        .catch(error => {
          commitMutation(commit);
          reject(error);
        });
    });
  },
  [AUTHENTICATE_AS]: ({ commit }, type) => {
    return new Promise((resolve, reject) => {
      axios.post(constants.baseUri + "/login-as", type)
        .then(resp => {
          commitMutation(commit, resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

let commitMutation = (commit, data = {}, useSub = false) => {
  commit(UPDATE_TOKEN, data.token || "", useSub);
  commit(UPDATE_EXP, data.expires_in || 0);
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
