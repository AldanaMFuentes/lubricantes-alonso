import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router.js";
import store from "./store/index.js";

const app = new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
});

app.$mount("#app");