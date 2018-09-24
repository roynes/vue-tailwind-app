import { baseUri } from "../helpers";

export let pagination = {
  data() {
    return {
      first: 1,
      curPage: 1,
      last: 1,
      next: 2,
      prev: 1,
      totalPages: 1,
      pageNumToShow: [],
      total: 1,
      to: 1,
      from: 1
    }
  },
  methods: {
    fetchPage(url, pageNum, ...args) {
      return new Promise((resolve, reject) => {
        axios.get(`${baseUri}/${url}${
          !!pageNum ? `?page=${pageNum}` : '?page=1'
        }${
          args.length == 0 ? '': `&${args.join('&')}`
        }`)
          .then((resp) => {
            let data = resp.data;

            this.assignPaginationData(data);

            if (
              !this.pageNumToShow.some(n => {
                return this.curPage === n.val;
              })
            ) {
              this.showPageNumber();
            }

            resolve(data.data);
          }).catch(err => {
            console.log(err.response || err);

            reject(err);
          });
      });

    },

    assignPaginationData(data) {
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
  }
}