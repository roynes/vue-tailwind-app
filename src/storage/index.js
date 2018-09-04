import Vuex from "vuex";
import Vue from "vue";
import AuthModule, * as AuthConstants from "./auth";
import UserModule, * as UserConstants from "./user"

Vue.use(Vuex);

let store = new Vuex.Store({
  strict: true,
  modules: {
    auth: AuthModule,
    user: UserModule
  }
});

export default store;
export { AuthConstants, UserConstants };
