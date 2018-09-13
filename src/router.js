import VueRouter from "vue-router";
import Vue from "vue";

import Login from "./pages/Login.vue";
import Dashboard from "./pages/Dashboard.vue";
import AdminDashboard from "./pages/Admin/AdminDashboard.vue";
import GroupListDashboard from "./pages/Admin/GroupListDashboard.vue";
import ClientListDashboard from "./pages/Admin/ClientListDashboard.vue";
import Error404 from "./pages/Error404.vue";

import store from "./storage";

Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: "",
      redirect: {
        name: "login"
      }
    },
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
      component: Dashboard,
      meta: {
        needsAuth: true
      },
      children: [
        {
          path: "",
          redirect: {
            name: "AdminHome"
          }
        },
        {
          path: "main",
          name: "AdminHome",
          component: AdminDashboard
        },
        {
          path: "group",
          name: "GroupHome",
          component: GroupListDashboard
        },
        {
          path: "client",
          name: "ClientHome",
          component: ClientListDashboard
        }
      ]
    },
    {
      path: "/sample",
      name: "sample",
      component: () => import("./components/FloatLabelInput.vue")
    },
    {
      path: "*",
      name: "err404",
      component: Error404
    }
  ]
});

router.beforeEach((to, from, next) => {
  let authenticated = !!store.state.auth.token;

  console.log("from", from.path, from.params, from.query);
  console.log("to", to.path, to.params, to.query);

  console.log("condition 1", to.matched.some(record => record.meta.needsAuth) && !authenticated);
  console.log("condition 2", to.matched.some(rec => rec.meta.guestOnly) && authenticated)

  if (to.matched.some(record => record.meta.needsAuth) && !authenticated) {
    next("/login");
  } else if (to.matched.some(rec => rec.meta.guestOnly) && authenticated) {
    next({
      name: "AdminHome",
      params: {
        account: store.state.user.cur_user.account.type
      }
    });
  } else {
    next();
  }
});

export default router;
