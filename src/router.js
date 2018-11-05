import { Error404 } from "@/pages/Error";

import Login from "./pages/Login.vue";
import Main from "./pages/Main.vue";
import VueRouter from "vue-router";
import store from "./storage";
import Vue from "vue";

import { Dashboard } from "@/pages/Layout";

Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: "/",
      beforeEnter(to, from, next) {
        let authenticated = !!store.state.auth.token;

        console.log("beforeEnter");

        if (authenticated)
          next({
            name: "main",
            params: { account: store.state.user.cur_user.account.type }
          });
        else next({ name: "login" });
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
      component: Main,
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
          }
        },
        {
          path: "group-list",
          name: "GroupList",
          component: () =>
            import('@/pages/Layout/GroupsList'),
          meta: {
            needsAuth: true
          }
        },
        {
          path: "client-list",
          name: "ClientList",
          component: () =>
            import('@/pages/Layout/ClientsList'),
          meta: {
            needsAuth: true
          }
        },
        {
          path: "users-list",
          name: "UsersList",
          component: () =>
            import('@/pages/Layout/UsersList'),
          meta: {
            needsAuth: true
          }
        },
        {
          path: "add/:type",
          name: "AddsAccount",
          component: () =>
            import('@/pages/Layout/AddDomainAndAccount'),
          meta: {
            needsAuth: true
          },
          props: true
        },
        {
          path: "update/:type",
          name: "UpdateDomainAndAccount",
          component: () =>
            import('@/pages/Layout/UpdateDomainAndAccount'),
          meta: {
            needsAuth: true
          },
          props: true
        }
      ]
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/components/TextInput")
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
  } else if (!to.matched.length) {
    next({
      name: "err404"
    });
  } else {
    next();
  }
});

export default router;
