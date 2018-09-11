import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import Axios from "axios";
import store, { AuthConstants } from "./storage";
import VeeValidate from "vee-validate";
import { token } from "./helpers";

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URI
});

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

if (token !== "") {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

axios.interceptors.response.use(undefined, err => {
  if (err.response.status === 401) {
    store.commit(`auth/${AuthConstants.UPDATE_EXP}`);
    store.commit(`auth/${AuthConstants.UPDATE_TOKEN}`);

    router.push("/login");
  }
});

window.axios = axios;

Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
