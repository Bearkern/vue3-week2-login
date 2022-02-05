import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2';
const api_path = 'clara-vue3';

const app = createApp({
  data() {
    return {
      products: [],
      detail: {}
    }
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)claraToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;
      const url = `${site}/api/user/check`;
      axios.post(url)
      .then(() => {
        this.getProducts();
      })
      .catch(err => {
        alert(err.data.message);
        window.location = './index.html';
      })
    },
    getProducts() {
      const url = `${site}/api/${api_path}/admin/products/all`;
      axios.get(url)
      .then(res => {
        this.products = Object.values(res.data.products);
      })
      .catch(err => {
        alert(err.data.message);
      })
    }
  },
  mounted() {
    this.checkLogin();
  }
});

app.mount('#app');