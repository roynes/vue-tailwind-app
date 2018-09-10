import VueRouter from "vue-router";
import Vue from "vue";

import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import AdminDashboard from "./views/Admin/AdminDashboard.vue";
import GroupDashboard from "./views/Admin/GroupDashboard.vue";
import ClientDashboard from "./views/Admin/ClientDashboard.vue";

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
      component: Dashboard,
      meta: {
        needsAuth: true
      },
      children: [,
        {
          path: '',
          redirect: {
            name: 'AdminHome'
          }
        },
        {
          path: 'main',
          name: 'AdminHome',
          component: AdminDashboard
        },
        {
          path: 'group',
          name: 'GroupHome',
          component: GroupDashboard
        },
        {
          path: 'client',
          name: 'ClientHome',
          component: ClientDashboard
        },
      ]
    },
    {
      path: "/sample",
      name: "sample",
      component: () => import("./components/FloatLabelInput.vue")
    },
    // {
    //   path: "*",
    //   redirect: {
    //     name: "home"
    //   }
    // },
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
