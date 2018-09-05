<template>
  <div>
    <div class="">
      <!-- toolbar -->
      <toolbar class="bg-orange-lighter pin-t" ref="toolbarTop">
        <div class="px-6 w-2/5 flex items-center">
          <a href="#" class="text-black pr-6 flex items-center no-underline py-1">
            <i class="fas fa-bars fa-lg no-underline antialiased"></i>
          </a>
          <a href="#" class="no-underline font-semibold text-xl text-grey-darkest hover:text-grey-dark py-1 flex items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Lineage_OS_Logo.png" class="h-10">
          </a>
        </div>
        <div class="px-6 w-3/5 flex items-center justify-end">
          <a href="#" class="text-grey-darker items-center ml-4">
            <img src="https://avatars1.githubusercontent.com/u/12960236?s=460&v=4" alt="PP" class="h-10 rounded-full">
          </a>
        </div>
      </toolbar>
      <!-- end of toolbar -->
      <!-- side bar and content -->
      <div class="w-full max-w-3xl mx-auto px-6 flex">
        <div class="w-1/4 px-6 z-90 static">
          <div class="w-full relative" style="top:4rem">
            <!-- Side bar here -->
            <div>
              Continue Here <====== 
              
            </div>
            <div>Added temporary top position to 4rem</div>
          </div>
        </div>
        <div class="min-h-screen"></div>
      </div>
      <!-- end of sidebar and content -->
      <!-- footer -->
    </div>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar.vue";
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";

import { AuthConstants as AUTH_CONSTANT } from "../storage";
import { mapActions } from "vuex";

export default {
  name: "Home",
  data: () => {
    return {
      toolbarHeight: "",
      sideBarAndContentHeight: "",
    }
  },
  methods: {
    ...mapActions("auth", {
      logout(dispatch) {
        dispatch(AUTH_CONSTANT.UNAUTHENTICATE).then(() => {
          this.$router.push("/login");
        });
      }
    })
  },
  components: {
    Toolbar,
    Sidebar,
    Footer
  },
  mounted() {
    let otherHeight = getComputedStyle(this.$refs.toolbarTop.$el).getPropertyValue('height');

    this.toolbarHeight = otherHeight;

    otherHeight = otherHeight.match(/\d+/)[0];
  
    this.sideBarAndContentHeight = `${ window.screen.availHeight - (otherHeight * 2) }px`;
  }
};
</script>
