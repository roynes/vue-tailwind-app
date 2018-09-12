<template>
  <div class="client-contents w-full">
    <div class="card my-6 max-h-168 rounded border shadow-md">
      <div class="icon flex items-center pb-4">
        <div class="py-3 px-2 -mt-4 text-white bg-purple-dark rounded shadow ml-4">
          <i class="fas fa-users fa-3x relative"></i>
        </div>
        <div class="ml-4">
          <h1>Clients</h1>
        </div>
        <div class="flex items-center justify-end w-full px-6">
          <div class="hover:rounded-full hover:bg-purple hover:text-white hover:shadow-md transition">
            <i class="fas fa-plus fa p-2"></i>
          </div>
        </div>
      </div>
      <div class="w-full grid grid-columns-12 flex py-2 items-center font-semibold grid-gap-2">
        <div class="col-span-1 text-center">#</div>
        <div class="col-span-3">Name</div>
        <div class="col-span-3">Email</div>
        <div class="col-span-3">Location</div>
        <div class="col-span-2 text-center">Actions</div>
      </div>

      <div class="mx-1">
        <div v-for="(client, index) in clients" 
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
            {{client.settings.email}}
          </div>
          <div class="col-span-3 break-word overflow-y-auto h-16 flex items-center">
            {{client.settings.address}}
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
      </div>

      <div class="w-full flex h-16 justify-between items-center text-sm font-thin px-6 py-2">
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

          <a class="p-2 mx-2 px-3 no-underline text-black hover:rounded-full hover:bg-purple hover:font-semibold hover:text-white transition-fast"
            :class="[curPage == o.val ? 'bg-purple rounded-full text-white font-semibold' : '']"
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
      </div>
    </div>
  </div>
</template>

<script>
import { baseUri } from "../../helpers";

export default {
  data() {
    return {
      clients: {},
      first: 1,
      curPage: 1,
      last: 1,
      next: 2,
      prev: 1,
      nextPageUrl: "",
      lastPageUrl: "",
      firstPageUrl: "",
      prevPageUrl: "",
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
          let data = resp.data.clients;

          this.assignData(data);

          if(! this.pageNumToShow.some(n => {
            return this.curPage === n.val;
          })) {
            this.showPageNumber();
          }

          console.log(data);
        })
        .catch(err => console.log(err.response));
    },
    assignData(data) {
      this.clients = data.data;
      this.curPage = data.current_page;
      this.last = data.last_page;
      this.prev = this.curPage < 1 ? 1 : this.curPage - 1;

      this.nextPageUrl = data.next_page_url;
      this.lastPageUrl = data.last_page_url;
      this.firstPageUrl = data.first_page_url;
      this.prevPageUrl = data.prev_page_url;
      this.perPage = data.per_page;

      this.total = data.total;
      this.totalPages = Math.ceil(this.total / this.perPage);

      this.from = data.from;
      this.to = data.to;
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
        let data = resp.data.clients;

        this.assignData(data);
        this.showPageNumber();

        console.log(data);
        console.log(this);
      })
      .catch(err => console.log(err.response));
  }
};
</script>
