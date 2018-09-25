import * as constants from "../helpers";
import AuthService from "../services/auth.service";

import { SET_CUR_USER } from "./user";
import authService from "../services/auth.service";

export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_EXP = "UPDATE_EXP";
export const AUTHENTICATE = "AUTHENTICATE";
export const UNAUTHENTICATE = "UNAUTHENTICATE";
export const AUTHENTICATE_AS = "AUTHENTICATE_AS";
export const UPDATE_MIMIC = "UPDATE_MIMIC";

const state = {
  token: constants.getToken(),
  expires_in: constants.getTokenExpiration(),
  mimic: false
};

const mutations = {
  [UPDATE_TOKEN]: (state, token) => {
    constants.setToken(token);
    state.token = constants.getToken();
  },
  [UPDATE_EXP]: (state, expiry = 0) => {
    constants.setTokenExpiry(expiry);
    state.expires_in = expiry;
  },
  [UPDATE_MIMIC]: (state, value) => {
    state.mimic = value;
  }
};

const actions = {
  [AUTHENTICATE]: ({ commit }, credentials) => {
    return new Promise((resolve, reject) => {
      AuthService.authenticate(credentials)
        .then(resp => {
          commitMutation(commit, resp.data, false);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + resp.data.token;

          resolve(resp);
        })
        .catch(err => {
          console.log(err);
          commitMutation(commit);
          reject(err);
        });
    });
  },
  [UNAUTHENTICATE]: ({ commit }, normal) => {
    return new Promise((resolve, reject) => {
      AuthService.logout(normal)
        .then(resp => {
          console.log("normal:", normal);
          console.log("response:", resp.data);
          console.log("response user:", resp.data.user || false);

          if (resp.data.user || false) {
            commitMutation(commit, resp.data);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + resp.data.token;
          } else {
            commitMutation(commit);
            delete axios.defaults.headers.common["Authorization"];
          }

          commit(UPDATE_MIMIC, false);
          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  [AUTHENTICATE_AS]: ({ commit }, { id, type }) => {
    return new Promise((resolve, reject) => {
      authService
        .authAs(id, type)
        .then(resp => {
          if (resp.data.user || false) {
            commitMutation(commit, resp.data, true);

            commit(UPDATE_MIMIC, true);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + resp.data.token;
          }

          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

let commitMutation = (commit, data = {}) => {
  let { token = "", user = {}, expires_in = 0 } = data;
  let { roles = "", permissions = "", ...userAccount } = user;

  commit(UPDATE_TOKEN, token || "");
  commit(UPDATE_EXP, expires_in || 0);
  commit(`user/${SET_CUR_USER}`, { userAccount, roles, permissions } || {}, {
    root: true
  });
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
