import * as constants from "../helpers";

export const CUR_USER = "CUR_USER";
export const SET_CUR_USER = "SET_CUR_USER";
export const GET_CUR_USER = "GET_CUR_USER";

const state = {
  cur_user: {}
};

const mutations = {
  [SET_CUR_USER](state, user = {}) {
    state.cur_user = user;
  }
};

const actions = {
  [GET_CUR_USER]({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${constants.baseUri}/user/${userId}?with=account`)
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
