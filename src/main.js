import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "css/reset.scss";
import "./elementUI.config.js";
import "./api";
import services from "./api";

Vue.config.productionTip = false;
Vue.prototype.$api = services;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
