<template>
  <Table>
    <i class="fas fa-users fa-3x" slot="icon"></i>
    <h1 slot="title">Users</h1>
    <template slot="title-option">
      <router-link 
        class="hover:rounded-full hover:bg-purple hover:text-white hover:shadow-md transition no-underline text-black"
        :to="{ name: 'AddsAccount', params: { type: domain.user }}"
      >
        <i class="fas fa-plus fa p-2"></i>
      </router-link>
    </template>
    <template slot="headers">
      <div class="col-span-1 text-center">#</div>
      <div class="col-span-3">Name</div>
      <div class="col-span-3">Email</div>
      <div class="col-span-3">Type</div>
      <div class="col-span-2 text-center">Actions</div>
    </template>
    <div slot="contents" v-for="(account, index) in accounts" 
      :key="index" 
      class="w-full grid grid-columns-12 flex h-16 items-center font-light grid-gap-2 mb-4 hover:bg-grey-light hover:rounded hover:shadow hover:font-medium"
    >
      <div class="col-span-1 text-center">
        {{ curPage == 1 ? index + 1 : from + index }}
      </div>
      <div class="col-span-3 break-word overflow-y-auto h-16 flex items-center">
        {{account.user.name || 'No name'}}
      </div>
      <div class="col-span-3 break-word overflow-y-auto h-16 flex items-center">
        {{account.user.email || 'No email'}}
      </div>
      <div class="col-span-3 break-word overflow-y-auto h-16 flex items-center">
        {{account.type}}
      </div>
      <div class="col-span-2 flex overflow-y-auto items-center justify-around px-1">
        <a class="p-1 no-underline text-black hover:text-white hover:rounded-full hover:bg-purple transition-fast"
          @click="update(account)"
        >
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
import { pagination, roles } from "@/mixins";
import Table from "@/components/Table";

export default {
  mixins: [pagination, roles],

  components: {
    Table
  },

  data() {
    return {
      accounts: {}
    };
  },

  methods: {
    fetchNextPage(num) {
      this.fetchPage(
        "users",
        num,
        `scope=exceptUser:${this.$store.state.user.cur_user.id}`,
        "with=user"
      ).then(accounts => (this.accounts = accounts));
    },

    update({ user, client_id, group_id, settings, type }) {
      // todo: continue here
      console.log(JSON.parse(settings));
      this.$router.push({
        name: "UpdateDomainAndAccount",
        params: {
          type: this.domain.user,
          id: user.id,
          input: {
            id: user.id,
            name: user.name,
            email: user.email,
            client_id,
            group_id,
            role: type
          }
        }
      });
    },
  },
  mounted() {
    this.fetchPage(
      "users",
      1,
      `scope=exceptUser:${this.$store.state.user.cur_user.id}`,
      "with=user"
    ).then(accounts => (this.accounts = accounts));
  }
};
</script>
