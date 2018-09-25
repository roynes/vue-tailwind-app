<template>
  <Table>
    <i class="fas fa-users fa-3x" slot="icon"></i>
    <h1 slot="title">Clients</h1>
    <template slot="title-option">
      <div class="hover:rounded-full hover:bg-purple hover:text-white hover:shadow-md transition">
        <i class="fas fa-plus fa p-2"></i>
      </div>
    </template>
    <template slot="headers">
      <div class="col-span-1 text-center">#</div>
      <div class="col-span-3">Name</div>
      <div class="col-span-3">Email</div>
      <div class="col-span-3">Location</div>
      <div class="col-span-2 text-center">Actions</div>
    </template>
    <div slot="contents" v-for="(client, index) in clients" 
      :key="index" 
      class="w-full grid grid-columns-12 flex h-16 items-center font-light grid-gap-2 mb-4 hover:bg-grey-light hover:rounded hover:shadow hover:font-medium"
    >
      <div class="col-span-1 text-center">
        {{ curPage == 1 ? index + 1 : from + index }}
      </div>
      <div class="col-span-3 break-word overflow-y-auto h-16 flex items-center">
        {{client.name}}
      </div>
      <div class="col-span-3 break-word overflow-y-auto h-16 flex items-center">
        {{JSON.parse(client.settings).email}}
      </div>
      <div class="col-span-3 break-word overflow-y-auto h-16 flex items-center">
        {{JSON.parse(client.settings).address}}
      </div>
      <div class="col-span-2 flex overflow-y-auto items-center justify-around px-1">
        <a class="p-1 no-underline text-black hover:text-white hover:rounded-full hover:bg-purple transition-fast"
          @click="loginAs(client.id)"
        >
          <i class="group fas fa-sign-in-alt cursor-pointer"></i>
        </a>
        <a class="p-1 no-underline text-black hover:text-white hover:rounded-full hover:bg-purple transition-fast">
          <i class="group fas fa-edit cursor-pointer"></i>
        </a>
        <a class="p-1 no-underline text-black hover:text-white hover:rounded-full hover:bg-purple transition-fast">
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

        <a class="p-2 mx-2 px-3 no-underline text-black rounded-full hover:bg-purple hover:font-semibold hover:text-white transition-fast"
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
import { baseUri, Roles } from "../../helpers";
import Table from "@/components/Table";
import { mapActions, mapState } from "vuex";
import { AUTHENTICATE_AS } from "../../storage/auth";
import { pagination } from "@/mixins";

export default {
  mixins: [pagination],

  components: {
    Table
  },

  data() {
    return {
      clients: {}
    };
  },

  computed: {
    ...mapState("user", {
      user: state => state.cur_user
    })
  },

  methods: {
    ...mapActions("auth", {
      loginAs(dispatch, clientId) {
        dispatch(AUTHENTICATE_AS, {
          type: Roles.CLIENT_ADMIN,
          id: clientId
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

    fetchNextPage(num) {
      this.fetchPage("client", num).then(clients => (this.clients = clients));
    }
  },

  mounted() {
    this.fetchPage("client").then(clients => (this.clients = clients));
  }
};
</script>
