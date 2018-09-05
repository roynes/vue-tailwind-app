import * as constants from "../helpers";
import { SET_CUR_USER } from "./user";

export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_EXP = "UPDATE_EXP";
export const AUTHENTICATE = "AUTHENTICATE";
export const UNAUTHENTICATED = "UNAUTHENTICATED";
export const UNAUTHENTICATE = "UNAUTHENTICATE";

const state = {
  token: constants.token,
  expires_in: constants.tokenExpiration
};

const mutations = {
  [UPDATE_TOKEN]: (state, token = "") => {
    constants.setToken(token);
    state.token = token;
  },
  [UPDATE_EXP]: (state, expiry = 0) => {
    constants.setTokenExpiry(expiry);
    state.expires_in = expiry;
  }
};

const actions = {
  [AUTHENTICATE]: ({ commit, state }, credentials) => {
    return new Promise((resolve, reject) => {
      axios
        .post(constants.baseUri + "/login", credentials)
        .then(resp => {
          commitMutation(commit, resp.data);

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + state.token;

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
          delete axios.defaults.headers.common["Authorization"];

          commitMutation(commit);
          resolve(resp);
        })
        .catch(error => {
          commitMutation(commit);
          reject(error);
        });
    });
  },
  [UNAUTHENTICATED]: ({ commit, dispatch }, error) => {
    // TODO: for later
  }
};

let commitMutation = (commit, data = {}) => {
  commit(UPDATE_TOKEN, data.token || "");
  commit(UPDATE_EXP, data.expires_in || 0);
  commit(`user/${SET_CUR_USER}`, data.user || {}, { root: true });
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
