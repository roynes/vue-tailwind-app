import router from "./router.js";
import store from "./storage";
import App from "./App.vue";
import "./common/axios.js";
import Vue from "vue";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
