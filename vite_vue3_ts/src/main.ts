import { createApp } from 'vue'
import App from './App.vue'
import moduleList from "./plugins/index";
import "./mock";
import './api/index'
import './library/map_api'

const app = createApp(App);

Object.keys(moduleList).forEach((key: any) => {
  app.use(moduleList[key].default);
});

app.mount("#app");
