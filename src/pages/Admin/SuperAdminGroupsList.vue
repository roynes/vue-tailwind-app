<template>
  <Table>
    <i class="fas fa-users fa-3x" slot="icon"></i>
    <h1 slot="title">Groups</h1>
    <template slot="title-option">
      <router-link 
        class="hover:rounded-full hover:bg-purple hover:text-white hover:shadow-md transition no-underline text-black"
        :to="{ name: 'AddsAccount', params: { type: domain.group }}"
      >
        <i class="fas fa-plus fa p-2"></i>
      </router-link>
    </template>
    <template slot="headers">
      <div class="col-span-1 text-center">#</div>
      <div class="col-span-3">Name</div>
      <div class="col-span-3">Email</div>
      <div class="col-span-3">Location</div>
      <div class="col-span-2 text-center">Actions</div>
    </template>
    <div slot="contents" v-for="(group, index) in groups" 
      :key="index" 
      class="w-full grid grid-columns-12 flex h-16 items-center font-light grid-gap-2 mb-4 hover:bg-grey-light hover:rounded hover:shadow hover:font-medium"
    >
      <div class="col-span-1 text-center">
        {{ curPage == 1 ? index + 1 : from + index }}
      </div>
      <div class="col-span-3 break-word overflow-y-auto h-16 flex items-center">
        {{group.name}}
      </div>
      <div class="col-span-3 break-word overflow-y-auto h-16 flex items-center">
        {{JSON.parse(group.settings).email || 'No Email'}}
      </div>
      <div class="col-span-3 break-word overflow-y-auto h-16 flex items-center">
        {{JSON.parse(group.settings).address || parseAddress(JSON.parse(group.settings))}}
      </div>
      <div class="col-span-2 flex overflow-y-auto items-center justify-around px-1">
        <a class="p-1 no-underline text-black hover:text-white hover:rounded-full hover:bg-purple transition-fast"
          @click="loginAs(group.id)"
        >
          <i class="group fas fa-sign-in-alt cursor-pointer"></i>
        </a>
        <a class="p-1 no-underline text-black hover:text-white hover:rounded-full hover:bg-purple transition-fast">
          <i class="group fas fa-edit cursor-pointer"></i>
        </a>
        <a 
          class="p-1 no-underline text-black hover:text-white hover:rounded-full hover:bg-purple transition-fast"
          @click="deleteGroup(group.id)"
        >
          <i class="group fas fa-trash-alt cursor-pointer"></i>
        </a>
      </div>
    </div>
    <template slot="footer">
      <div>Showing {{to}} of {{total}} items</div>
      <div class="flex items-end cursor-pointer">
        <a class="p-2 no-underline text-black transition-fast"
          :class="[curPage == first ? 'cursor-not-allowed hover:bg-grey-lightest hover:text-grey-darkest' : 'hover:bg-purple hover:text-white hover:rounded']"
          @click="fetchNextPage(first)"
        >
          First
        </a>
        <a class="p-2 no-underline text-black hover:text-white hover:bg-purple hover:rounded transition-fast " 
          @click="fetchNextPage(curPage - 1)"
          v-if="curPage != first"
        >
          Prev
        </a>

        <a class="p-2 mx-2 px-3 no-underline rounded-full text-black hover:bg-purple hover:font-semibold hover:text-white transition-fast"
          :class="[curPage == o.val ? 'bg-purple text-white font-semibold' : '']"
          v-for="o in pageNumToShow" 
          :key="o.in"
          @click="fetchNextPage(o.val)"
        >
          {{ o.val }}
        </a>
        
        <a class="p-2 no-underline text-black hover:text-white hover:bg-purple hover:rounded transition-fast" 
          @click="fetchNextPage(curPage + 1)"
          v-if="curPage != last"
        >
          Next
        </a>
        <a class="p-2 no-underline text-black transition-fast"
          :class="[curPage == last ? 'cursor-not-allowed hover:bg-grey-lightest hover:text-grey-darkest' : 'hover:bg-purple hover:text-white hover:rounded']"
          @click="fetchNextPage(last)"
        >
          Last
        </a>
      </div>
    </template>
  </Table>
</template>

<script>
import { AUTHENTICATE_AS } from "../../storage/auth";
import { GET_CUR_USER } from "../../storage/user";
import { pagination, roles } from "@/mixins";
import { GroupService } from "@/services";
import { mapActions, mapState } from "vuex";
import { baseUri } from "../../helpers";
import { Table } from "@/components";

export default {
  mixins: [pagination, roles],

  components: {
    Table
  },

  data() {
    return {
      groups: {}
    };
  },

  methods: {
    ...mapActions("auth", {
      loginAs(dispatch, groupId, ) {
        dispatch(AUTHENTICATE_AS, {
          type: this.roles.GROUP_ADMIN,
          id: groupId
        })
          .then(resp => {
            this.$router.push({
              name: "main",
              params: {
                account: this.user.account.type
              }
            });
          })
          .catch(err => {
            console.log(err.response || err.config || err);
          });
      }
    }),

    deleteGroup(id) {
      GroupService.remove(id)
        .then(resp => {
          this.fetchPage("groups")
            .then(groups => {
              this.showPageNumber();
              this.groups = groups;
            });
        })
        .catch(err => console.log(err.response || err));
    },

    parseAddress(settings) {
      return `${settings.street}, ${settings.city}, ${settings.state}, ${settings.zip_code || '2000'}`;
    },

    fetchNextPage(num) {
      this.fetchPage("groups", num).then(groups => (this.groups = groups));
    }
  },

  computed: {
    ...mapState("user", {
      user: state => state.cur_user
    })
  },

  mounted() {
    this.fetchPage("groups").then(groups => (this.groups = groups));
  }
};
</script>