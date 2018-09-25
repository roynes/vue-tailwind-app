import * as constants from "../helpers";

export const CUR_USER = "CUR_USER";
export const SET_CUR_USER = "SET_CUR_USER";

const state = {
  cur_user: constants.getUser(),
  permissions: constants.getPermission().split(","),
  roles: constants.getRole().split(",")
};

const mutations = {
  [SET_CUR_USER](state, { userAccount, roles, permissions, sub }) {
    console.log(userAccount, roles, permissions);

    constants.setUser(userAccount);
    constants.setPermissions(permissions);
    constants.setRoles(roles);

    state.cur_user = userAccount;
    state.permissions = permissions;
    state.roles = roles;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
