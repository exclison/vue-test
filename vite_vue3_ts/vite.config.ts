import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

const baseConfig = {
  plugins: [vue(), vueJsx()],
  resolve:{
    alias:{
      '@':'src',
      'public':'public',
      'views':'src/views',
      'assets':'src/assets',
      'components':'src/components',
      'map_api':'src/library/map_api.ts',
    }
  }
};
const devConfig = {
  server: {
    host: "127.0.0.1",
    port: 3002,
    open: true,
  },
};


export default defineConfig(({ command, mode }) => {
  console.log(mode, "mode");

  const loadEnvInstance = loadEnv(mode, process.cwd());
  const { VITE_PUBLIC_FILENAME, VITE_OUTDIR } = loadEnvInstance;

  const config = {
    ...baseConfig,
    publicDir: VITE_PUBLIC_FILENAME,
    build: {
      outDir: `dist/${VITE_OUTDIR}`,
    },
  };
  
  if (command === "serve") {
    return { ...devConfig, ...config };
  } else {
    // command === build
    return config;
  }
});
