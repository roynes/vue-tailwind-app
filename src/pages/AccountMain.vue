<template>
  <Dashboard >
    <div slot="toolbar-contents" class="text-grey-darker flex items-center justify-end ml-4 cursor-pointer focus:rounded-full ">
      <img src="https://avatars1.githubusercontent.com/u/12960236?s=460&v=4" alt="PP" class="h-10 rounded-full" @click="toggleUserNav">
    </div>
    <nav slot="sidebar-contents">
      <div>
        <router-link 
          :to="{ name:'main' }" 
          class="flex items-center hover:text-grey-darker hover:bg-orange-lighter py-4 pl-6 mr-1 mb-4 no-underline text-black"
          append
        >
          <p class="lg:text-lg font-semibold">Dashboard</p>
        </router-link>
      </div>
      <div v-if="roles.includes(CONSTANT_ROLES.SUPER_ADMIN)">
        <div class="ml-6 my-3">
          <p class="lg:text-lg font-semibold">Subdomains</p>
        </div>
        <div class="mb-2">
          <router-link 
            :to="{ name:'GroupList' }" 
            class="flex items-center hover:text-grey-darker hover:bg-orange-lighter py-4 pl-6 mr-1 no-underline text-black"
            append
          >
            <i class="fas fa-object-ungroup lg:fa-lg pr-3"></i>
            <p class="lg:text-lg">Groups</p>
          </router-link>
        </div>
        <div class="mb-2">
          <router-link 
            :to="{ name:'ClientList' }" 
            class="flex items-center hover:text-grey-darker hover:bg-orange-lighter py-4 pl-6 mr-1 no-underline text-black"
            append
          >
            <i class="fas fa-object-ungroup lg:fa-lg pr-3"></i>
            <p class="lg:text-lg">Clients</p>
          </router-link>
        </div>

        <div class="mb-2">
          <router-link 
            :to="{ name:'UsersList' }" 
            class="flex items-center hover:text-grey-darker hover:bg-orange-lighter py-4 pl-6 mr-1 no-underline text-black"
            append
          >
            <i class="fas fa-object-ungroup lg:fa-lg pr-3"></i>
            <p class="lg:text-lg">Users</p>
          </router-link>
        </div>
      </div>

      <div v-else-if="roles.includes(CONSTANT_ROLES.GROUP_ADMIN)">

      </div>
    </nav>
    <div slot="main-contents">
      <router-view></router-view>
    </div>
    <div slot="fixed-contents">
      <div class="fixed top-16 xl:card-pin-right-3xl lg:card-pin-right-2xl md:card-pin-right-tablet mt-1" v-show="showUserNav">
        <div class="pr-6">
          <div class="w-48 flex flex-col items-center m-1 py-3 px-3 border shadow bg-white">
            <div 
              class="py-2 w-full hover:bg-orange-lightest border-none flex items-center" 
              @click="logout"
            >
              <i class="fas fa-sign-out-alt px-3"></i>
              <p>Logout</p>
            </div>
            <div 
              class="py-2 w-full hover:bg-orange-lightest border-none flex items-center"
            >
              <i class="fas fa-cog px-3"></i>
              <p>Settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
</template>

<script>
import { AuthConstants as AUTH_CONSTANT } from "../storage";
import  * as constants from "../helpers";
import { Roles } from "../helpers";
import { mapActions, mapState } from "vuex";
import { Error401 } from "@/pages/Error";

import Dashboard from "../components/Dashboard.vue";

export default {
  name: "DashBoard",
  data() {
    return {
      showUserNav: false,
      CONSTANT_ROLES: Roles,
    };
  },
  computed: {
    ...mapState('user', ['roles'])
  },
  components: {
    Dashboard,
    Error401
  },
  methods: {
    ...mapActions("auth", {
      logout(dispatch) {
        dispatch(AUTH_CONSTANT.UNAUTHENTICATE).then(() => {
          this.$router.push("/login");
        });
      }
    }),
    toggleUserNav() {
      this.showUserNav = !this.showUserNav;
    }
  }
};
</script>

<style lang="scss" scoped>
@tailwind utilities;

.router-link-active.router-link-exact-active {
  @apply bg-orange-light;
}
</style>
