import * as constants from "../helpers";
import _ from "lodash";
export const CUR_USER = "CUR_USER";
export const SET_CUR_USER = "SET_CUR_USER";
export const GET_CUR_USER = "GET_CUR_USER";

const state = {
  cur_user: constants.user,
  permissions: constants.permission.split(','),
  roles: constants.permission.split(','),
};

const mutations = {
  [SET_CUR_USER](state, user = {}) {
    let perms = _.isEmpty(user) ? [] : user.permissions;
    let roles = _.isEmpty(user) ? [] : user.roles;

    constants.setUser(user);
    constants.setPermissions(perms);
    constants.setRoles(roles);

    state.cur_user = user;
    state.permissions = perms;
    state.roles = roles;
  }
};

const actions = {
  [GET_CUR_USER]({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${constants.baseUri}/user/${userId}?with=account,roles,permissions`)
        .then(resp => {
          commit(SET_CUR_USER, resp.data);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
