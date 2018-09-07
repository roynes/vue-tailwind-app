<template>
  <div>
    <div class="bg-grey-lightest">
      <!-- toolbar -->
      <toolbar class="bg-orange-lighter pin-t shadow" ref="toolbarTop">
        <div class="lg:px-6 md:pl-4 lg:w-1/5 md:w-2/9 flex items-center">
          <div class="text-black lg:pr-6 md:pr-2 flex items-center no-underline py-1" @click="toggleSideBar">
            <i class="fas fa-bars fa-lg no-underline antialiased"></i>
          </div>
          <div class="no-underline font-semibold text-xl text-grey-darkest hover:text-grey-dark py-1 flex items-center justify-center">
            <img src="@/assets/logo.png" class="h-10" alt="CL" v-show="!! !companyLogo">
            <img :src="companyLogo" class="h-10" v-show="!! companyLogo">
          </div>
        </div>
        <div class="lg:px-6 md:px-0 lg:w-4/5 md:w-7/9">
          <!-- // ! Don't remove the samples so as to debug later -->
          <!-- <div class="text-grey-darker items-center ml-4 cursor-pointer focus:rounded-full">
            <img src="https://avatars1.githubusercontent.com/u/12960236?s=460&v=4" alt="PP" class="h-10 rounded-full" @click="toggleUserNav">
          </div> -->
          <slot name="toolbar-contents">
            <!-- contents here -->
          </slot>
        </div>
      </toolbar>
      <!-- end of toolbar -->
      
      <!-- side bar and content -->
      <div class="w-full xl:max-w-3xl lg:max-w-2xl mx-auto lg:px-6 md:pl-4 md:pr-2 flex">
        <!-- Side bar -->
        <div class="lg:w-1/5 md:w-2/9 md:pr-3 lg:pr-6 z-90 static" v-show="showSideBar">
          <Sidebar class="top-16 relative sticky -h-screen-16">
            <!-- // ! Don't remove the samples so as to debug later -->
            <!-- <div class="flex items-center hover:text-grey-darker hover:bg-orange-lighter py-4 pl-6 mr-1 mb-4">
              <p class="lg:text-lg font-semibold">Dashboard</p>
            </div>
            <div class="ml-6 my-3">
              <p class="lg:text-lg font-semibold">Subdomains</p>
            </div>
            <div class="flex items-center hover:text-grey-darker hover:bg-orange-lighter py-4 pl-6 mr-1">
              <i class="fas fa-object-ungroup lg:fa-lg pr-3"></i>
              <p class="lg:text-lg">Groups</p>
            </div>
            <div class="flex items-center hover:text-grey-darker hover:bg-orange-lighter py-4 pl-6 mr-1">
              <i class="fas fa-object-ungroup lg:fa-lg pr-3"></i>
              <p class="lg:text-lg">Clients</p>
            </div> -->
            <slot name="sidebar-contents"></slot>
          </Sidebar>
        </div>

        <!-- Content -->
        <div class="min-h-screen static" :class="adjustContentWidth">
          <Container class="py-16 pt-22">
            <div class="md:-m-5 lg:-m-0">
              <slot name="main-contents">
                <!-- contents here -->
              </slot>
              <!-- // ! Don't remove the samples so as to debug later -->
              <!-- <div class="flex items-center mb-4">
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">1</p>
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">2</p>
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">3</p>
              </div>
              <div class="flex items-center mb-4">
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">1</p>
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">2</p>
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">3</p>
              </div>
              <div class="flex items-center mb-4">
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">1</p>
              </div>
              <div class="flex items-center mb-4">
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">1</p>
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">3</p>
              </div>
              <div class="flex items-center mb-4">
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">1</p>
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">3</p>
              </div>
              <div class="flex items-center mb-4">
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">1</p>
              </div>
              <div class="flex items-center mb-4">
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">1</p>
                <p class="flex-1 text-center px-20 py-20 mx-2 bg-orange-lighter">3</p>
              </div> -->
            </div>
          </Container>
        </div>
      </div>
      <!-- end of sidebar and content -->

      <slot name="fixed-contents">
        <!-- contents here -->
      </slot>
      <!-- // ! Don't remove the samples so as to debug later -->
      <!-- sample fixed user nav card -->
      <!-- <div class="fixed top-16 xl:card-pin-right-3xl lg:card-pin-right-2xl md:card-pin-right-tablet mt-1" v-show="showUserNav">
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
      </div> -->

    </div>
  </div>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import Sidebar from "./Sidebar.vue";
import Container from "./Container.vue";

import { AuthConstants as AUTH_CONSTANT } from "../storage";
import { mapActions } from "vuex";

export default {
  name: "Home",
  data: () => {
    return {
      showSideBar: true,
      // showUserNav: false,
    }
  },
  props: {
    companyLogo: {
      type: String,
      default: ""
    }
  },
  methods: {
    // ...mapActions("auth", {
    //   logout(dispatch) {
    //     dispatch(AUTH_CONSTANT.UNAUTHENTICATE).then(() => {
    //       this.$router.push("/login");
    //     });
    //   }
    // }),
    toggleSideBar() {
      this.showSideBar = !this.showSideBar;
    },
    // toggleUserNav() {
    //   this.showUserNav = !this.showUserNav;
    // }
  },
  computed: {
    adjustContentWidth() {
      return {
        'lg:w-4/5 md:w-7/9': this.showSideBar,
        'w-full': !this.showSideBar
      }
    }
  },
  components: {
    Toolbar,
    Sidebar,
    Container
  }
};
</script>

<style lang="scss" scoped>
 @tailwind utilities;

.-h-screen-16 {
  height:calc(100vh - 4rem);
  height:-webkit-calc(100vh - 4rem);
  height:-moz-calc(100vh - 4rem);
}

@responsive {
  .card-pin-right-3xl {
    right:calc(calc(100vw - 80rem) / 2);
    right:-webkit-calc(calc(100vw - 80rem) / 2);
    right:-moz-calc(calc(100vw - 80rem) / 2);
  }
  
  .card-pin-right-2xl {
    right:calc(calc(100vw - 64rem) / 2);
    right:-webkit-calc(calc(100vw - 64rem) / 2);
    right:-moz-calc(calc(100vw - 64rem) / 2);
  }

  .card-pin-right-tablet {
    right:calc(calc(100vw - 48.5rem) / 2);
    right:-webkit-calc(calc(100vw - 48.5rem) / 2);
    right:-moz-calc(calc(100vw - 48.5rem) / 2);
  }
}
</style>

