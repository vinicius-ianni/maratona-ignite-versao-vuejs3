import { createApp } from "vue";
import App from "./App.vue";

import router from './Router';

import "./styles/global.css";

//App.use(router);

createApp(App).use(router).mount("#app");
