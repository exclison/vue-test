import { createApp } from 'vue'
import App from './App.vue'

import store from './store';
import router from './router';
import moduleList from "./plugins/index";
import "./mock";
import './api/index'
import './library/map_api'
import './assets/styles/index.scss'

const app = createApp(App);

app.use(store)
app.use(router)

Object.keys(moduleList).forEach((key: any) => {
  app.use(moduleList[key].default);
});

app.mount("#app");
