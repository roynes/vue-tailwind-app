import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import Axios from "axios";
import store from "./storage";
import VeeValidate from "vee-validate";

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URI
});

window.axios = axios;

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
