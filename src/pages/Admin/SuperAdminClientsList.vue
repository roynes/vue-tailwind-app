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
        <a href="#" class="p-1 no-underline text-black hover:text-white hover:rounded-full hover:bg-purple transition-fast">
          <i class="group fas fa-sign-in-alt cursor-pointer"></i>
        </a>
        <a href="#" class="p-1 no-underline text-black hover:text-white hover:rounded-full hover:bg-purple transition-fast">
          <i class="group fas fa-edit cursor-pointer"></i>
        </a>
        <a href="#" class="p-1 no-underline text-black hover:text-white hover:rounded-full hover:bg-purple transition-fast">
          <i class="group fas fa-trash-alt cursor-pointer"></i>
        </a>
      </div>
    </div>
    <template slot="footer">
      <div>Showing {{to}} of {{total}} items</div>
      <div class="flex items-end cursor-pointer">
        <a class="p-2 no-underline text-black transition-fast"
          :class="[curPage == first ? 'cursor-not-allowed hover:bg-grey-lightest hover:text-grey-darkest' : 'hover:bg-purple hover:text-white hover:rounded']"
          @click="fetchPage(first)"
        >
          First
        </a>
        <a class="p-2 no-underline text-black hover:text-white hover:bg-purple hover:rounded transition-fast " 
          @click="fetchPage(curPage - 1)"
          v-if="curPage != first"
        >
          Prev
        </a>

        <a class="p-2 mx-2 px-3 no-underline text-black rounded-full hover:bg-purple hover:font-semibold hover:text-white transition-fast"
          :class="[curPage == o.val ? 'bg-purple text-white font-semibold' : '']"
          v-for="o in pageNumToShow" 
          :key="o.in"
          @click="fetchPage(o.val)"
        >
          {{ o.val }}
        </a>
        <a class="p-2 no-underline text-black hover:text-white hover:bg-purple hover:rounded transition-fast" 
          @click="fetchPage(curPage + 1)"
          v-if="curPage != last"
        >
          Next
        </a>
        <a class="p-2 no-underline text-black transition-fast"
          :class="[curPage == last ? 'cursor-not-allowed hover:bg-grey-lightest hover:text-grey-darkest' : 'hover:bg-purple hover:text-white hover:rounded']"
          @click="fetchPage(last)"
        >
          Last
        </a>
      </div>
    </template>
  </Table>
</template>

<script>
import { baseUri } from "../../helpers";
import Table from "@/components/Table";

export default {
  components: {
    Table
  },
  data() {
    return {
      clients: {},
      first: 1,
      curPage: 1,
      last: 1,
      next: 2,
      prev: 1,
      totalPages: 1,
      pageNumToShow: [],
      total: 1,
      to: 1,
      from: 1,
    };
  },
  methods: {
    fetchPage(num) {
      axios
        .get(`${baseUri}/clients?page=${num}`)
        .then(resp => {
          let data = resp.data;

          this.assignData(data);

          if (
            !this.pageNumToShow.some(n => {
              return this.curPage === n.val;
            })
          ) {
            this.showPageNumber();
          }
        })
        .catch(err => console.log(err.response));
    },
    assignData(data) {
      this.clients = data.data;

      this.curPage = data.meta.current_page;
      this.last = data.meta.last_page;
      this.perPage = data.meta.per_page;
      this.total = data.meta.total;
      this.from = data.meta.from;
      this.to = data.meta.to;

      this.prev = this.curPage < 1 ? 1 : this.curPage - 1;
      this.totalPages = Math.ceil(this.total / this.perPage);
    },
    showPageNumber() {
      this.pageNumToShow = [];

      for (let i = 0; i < 3; i++) {
        if (this.curPage + i <= this.totalPages) {
          this.pageNumToShow.push({ in: i, val: this.curPage + i });
        }

        if (this.curPage == this.totalPages) {
          break;
        }
      }
    }
  },
  mounted() {
    axios
      .get(`${baseUri}/clients`)
      .then(resp => {
        let data = resp.data;

        this.assignData(data);
        this.showPageNumber();

        console.log(data);
        console.log(this);
      })
      .catch(err => console.log(err.response));
  }
};
</script>