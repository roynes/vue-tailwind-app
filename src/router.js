import VueRouter from "vue-router";
import Vue from "vue";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/sample",
      name: "sample",
      component: () => import("./components/FloatLabelInput.vue")
    }
  ]
});

export default router;
