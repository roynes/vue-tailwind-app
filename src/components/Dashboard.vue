<template>
  <div>
    <div class="bg-grey-lightest">
      <!-- toolbar -->
      <toolbar class="bg-orange-lighter pin-t shadow" ref="toolbarTop">
        <div class="lg:px-6 md:pl-4 lg:w-1/5 md:w-2/9 flex items-center">
          <div class="text-black lg:pr-6 md:pr-2 flex items-center no-underline py-1" @click="toggleSideBar" ref="sidebarToggle">
            <i class="fas fa-bars fa-lg no-underline antialiased"></i>
          </div>
          <router-link :to="{name:'main'}" class="no-underline font-semibold text-xl text-grey-darkest hover:text-grey-dark py-1 flex items-center justify-center">
            <img :src="companyLogo" class="h-10" v-if="!! companyLogo">
            <img src="@/assets/logo.png" class="h-10" alt="CL" v-else-if="!! !companyLogo">
          </router-link>
        </div>
        <div class="lg:px-6 md:px-0 lg:w-4/5 md:w-7/9">
          <slot name="toolbar-contents">
            <!-- contents here -->
          </slot>
        </div>
      </toolbar>
      <!-- end of toolbar -->
      
      <!-- side bar and content -->
      <div class="w-full xl:max-w-3xl lg:max-w-2xl mx-auto lg:px-6 md:px-2 flex">
        <!-- Side bar -->
        <div class="lg:w-1/5 md:w-2/9 md:pr-3 lg:pr-6 z-90 static" v-show="showSideBar">
          <Sidebar class="top-16 relative sticky -h-screen-16">
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
              
            </div>
          </Container>
        </div>
      </div>
      <!-- end of sidebar and content -->

      <slot name="fixed-contents">
        <!-- contents here -->
      </slot>

    </div>
  </div>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import Sidebar from "./Sidebar.vue";
import Container from "./Container.vue";

export default {
  name: "Home",
  data: () => {
    return {
      showSideBar: true
    };
  },
  props: {
    companyLogo: {
      type: String,
      default: ""
    }
  },
  methods: {
    toggleSideBar() {
      this.showSideBar = !this.showSideBar;
    }
  },
  computed: {
    adjustContentWidth() {
      return {
        "lg:w-4/5 md:w-7/9": this.showSideBar,
        "w-full": !this.showSideBar
      };
    }
  },
  components: {
    Toolbar,
    Sidebar,
    Container
  }
};
</script>
