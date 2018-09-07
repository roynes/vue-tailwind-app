import VueRouter from "vue-router";
import Vue from "vue";

import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";

import store from "./storage";
Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guestOnly: true,
        needsAuth: false
      }
    },
    {
      path: "/:account/dashboard",
      name: "home",
      component: Dashboard,
      meta: {
        needsAuth: true
      }
    },
    {
      path: "/sample",
      name: "sample",
      component: () => import("./components/FloatLabelInput.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  let authenticated = !!store.state.auth.token;

  if (to.matched.some(record => record.meta.needsAuth) && !authenticated) {
    next("/login");
  } else if (to.matched.some(rec => rec.meta.guestOnly) && authenticated) {
    next({
      name: "home"
    });
  } else {
    next();
  }
});

export default router;
