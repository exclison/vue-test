import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

const baseConfig = {
  plugins: [vue(), vueJsx()],
};
const devConfig = {
  server: {
    host: "127.0.0.1",
    port: 3000,
    open: true,
  },
};
const prodConfig = {
  build: {},
};

export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    return { ...devConfig, ...baseConfig };
  } else {
    // command === build
    return { ...prodConfig, ...baseConfig };
  }
});
