import Vue from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPause,
  faPlay,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

library.add(faPause, faPlay, faVolumeUp, faVolumeDown, faVolumeMute);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
