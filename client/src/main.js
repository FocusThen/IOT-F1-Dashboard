import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
//API
Vue.prototype.$API_URL = "https://iot-f1-dashboard.herokuapp.com/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
