import VueRouter from "vue-router";
import Vue from "vue";

import Login from "./pages/Login.vue";
import AccountMain from "./pages/AccountMain.vue";
import Dashboard from "./pages/Dashboard.vue";

import { GroupListDashboard, ClientListDashboard } from "@/pages/Admin";

import { Error404 } from "@/pages/Error";

import store from "./storage";

Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: "/",
      beforeEnter(to, from, next) {
        let authenticated = !! store.state.auth.token;

        console.log('beforeEnter');

        if(authenticated) next({ name: "main", params: { account : store.state.user.cur_user.account.type }  })
        else next({name: "login"})
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
      component: AccountMain,
      meta: {
        needsAuth: true
      },
      children: [
        {
          path: "",
          name: "main",
          component: Dashboard,
          meta: {
            needsAuth: true
          },
        },
        {
          path: "group-list",
          name: "GroupList",
          component: GroupListDashboard,
          meta: {
            needsAuth: true
          },
        },
        {
          path: "client-list",
          name: "ClientList",
          component: ClientListDashboard,
          meta: {
            needsAuth: true
          },
        }
        // Todo: Add Routes for Group And Client
        // Todo: Design Components for Group and client
        // Todo: Implement directly Login as
      ]
    },
    {
      path: "/test",
      name: "test",
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

  if (to.matched.some(record => record.meta.needsAuth) && !authenticated) {
    next("/login");
  } else if (to.matched.some(rec => rec.meta.guestOnly) && authenticated) {
    next({
      name: "main",
      params: {
        account: store.state.user.cur_user.account.type
      }
    });
  } else if(!to.matched.length ) {
    next({
      name: "err404"
    });
  } else {
    next();
  }
});

export default router;
