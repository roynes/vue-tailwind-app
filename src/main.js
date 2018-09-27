import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import Axios from "axios";
import store, { AuthConstants } from "./storage";
import { getToken } from "./helpers";

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URI
});

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

if (getToken() !== "") {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
}

axios.interceptors.response.use(undefined, err => {
  console.log("Error response intercepted");

  if (err.response.status === 401 && !!getToken()) {
    store.commit(`auth/${AuthConstants.UPDATE_EXP}`);
    store.commit(`auth/${AuthConstants.UPDATE_TOKEN}`);

    router.push("/login");
  }

  return Promise.reject(err)
});

window.axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
