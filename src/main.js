// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from "vue-router";
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import "common/stylus/index.css";
import VueResouce from "vue-resource";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResouce);

const routes = [
  { path: "/goods", component: goods },
  { path: "/ratings", component: ratings },
  { path: "/seller", component: seller },
  { path: "/", redirect: "/goods" }
];

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes
});

let vm = new Vue({
  el: "#app",
  data () {
    return {
      eventHub: new Vue()
    };
  },
  components: {App},
  router
});

Vue.use({
  vm
});
