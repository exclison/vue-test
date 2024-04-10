/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2024-01-30 15:24:54
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2024-03-14 10:02:49
 * @FilePath: \lrx_h5\src\main.ts
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'

import store from './store';
import router from './router';
import moduleList from "./plugins/index";
import components from "./components/index";

import Vant from 'vant';
import 'vant/lib/index.css';

import "./mock";
import './api/index'
import './library/map_api'
import 'viewerjs/dist/viewer.css'
import './assets/styles/index.scss'
import './assets/styles/font/iconfont.css'
import './assets/styles/fonts/index.scss'

const app = createApp(App);

app.use(store)
app.use(router)
app.use(Vant);

Object.keys(moduleList).forEach((key: any) => {
  app.use(moduleList[key]);
});
Object.keys(components).forEach((key: any) => {
  app.component(key, components[key]);
});

app.mount("#app");
