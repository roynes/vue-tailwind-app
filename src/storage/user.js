import * as constants from '../helpers';

export const CUR_USER = 'CUR_USER';
export const SET_CUR_USER = 'SET_CUR_USER';

const state = {
  cur_user: {},
}

const mutations = {
  [SET_CUR_USER](state, user = {}) {
    state.cur_user = user;
  }  
}

export default {
  namespaced: true,
  state,
  mutations
};

