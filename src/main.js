import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import Axios from "axios";

Vue.config.productionTip = false;

Axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
Axios.defaults.headers.common["Content-Type"] = "application/json";
Axios.defaults.headers.common["Accept"] = "application/json";

window.Axios = Axios;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
