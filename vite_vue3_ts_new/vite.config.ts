import {defineConfig, loadEnv} from "vite";
import babel from 'vite-plugin-babel';
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import legacy from '@vitejs/plugin-legacy';
// import babelRecordTuple from "@babel/plugin-proposal-record-and-tuple"
import path from "path";
// import styleImport, { VantResolve } from "vite-plugin-style-import";
import postcsspxtoviewport8plugin from "postcss-px-to-viewport-8-plugin";

const baseConfig = {
    plugins: [
        // babelRecordTuple(),
        babel(),
        //{
        //             babelConfig: {
        //                 babelrc: false,
        //                 configFile: false,
        //                 plugin: ["@babel/plugin-proposal-record-and-tuple"],
        //             }
        //         }
        vue(),
        vueJsx(),
        // legacy({
        //     targets: ['defaults', 'not IE 11'],
        //     polyfills: ["@babel/plugin-proposal-record-and-tuple"],
        //     additionalLegacyPolyfills: ["@babel/plugin-proposal-record-and-tuple"],
        //     modernPolyfills: ["@babel/plugin-proposal-record-and-tuple"],
        // }),
        // styleImport({
        //   resolves: [VantResolve()],
        // }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@views": path.resolve(__dirname, "./src/views"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@images": path.resolve(__dirname, "./src/assets/images"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@map_api": path.resolve(__dirname, "./src/library/map_api.ts"),
        },
    },
    css: {
        postcss: {
            plugins: [
                // postcsspxtoviewport8plugin({
                //   unitToConvert: "px",
                //   viewportWidth: 750,
                //   unitPrecision: 5,
                //   propList: ["*"],
                //   viewportUnit: "vw",
                //   fontViewportUnit: "vw",
                //   selectorBlackList: [],
                //   minPixelValue: 1,
                //   mediaQuery: false,
                //   replace: true,
                //   exclude: [/viewerjs/, /vant/],
                //   landscape: false,
                //   landscapeUnit: "vw",
                //   landscapeWidth: 568,
                // }),
            ],
        },
    },
};
const devConfig = {
    server: {
        host: "0.0.0.0",
        port: 3002,
        open: true,
    },
};

export default defineConfig(({command, mode}) => {
    console.log(mode, "mode");

    const loadEnvInstance = loadEnv(mode, process.cwd());
    const {VITE_PUBLIC_FILENAME, VITE_OUTDIR, VITE_ROUTER_BASE} = loadEnvInstance;

    const config = {
        ...baseConfig,
        base: VITE_ROUTER_BASE,
        publicDir: VITE_PUBLIC_FILENAME,
    };

    if (command === "serve") {
        return {
            ...devConfig,
            ...config,
            build: {
                outDir: `dist/${VITE_OUTDIR}`,
                minify: "terser",
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                },
            },
        };
    } else {
        // command === build
        return {
            ...config,
            build: {
                outDir: `dist/${VITE_OUTDIR}`,
                minify: "terser",
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                },
            },
        };
    }
});
