/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-06-07 14:57:50
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2024-01-15 10:29:07
 * @FilePath: \vue-test\vite_vue3_ts\src\router\index.ts
 * @Description: 
 */

import { createRouter, createWebHashHistory } from 'vue-router'


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: "/", component: () => import('../views/home.vue') },
  { path: "/map", component: () => import('../views/map/map.vue') },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router
