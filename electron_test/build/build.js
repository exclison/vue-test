const builder = require("electron-builder")
const Platform = builder.Platform

// Let's get that intellisense working
/**
* @type {import('electron-builder').Configuration}
* @see https://www.electron.build/configuration/configuration
*/
const options = {

  //压缩级别 "store” | “normal” | "maximum".
  compression: "normal",

  //构建开始时运行的函数
  artifactBuildStarted: (context) => {
    // identifyLinuxPackage(context)
  },
  //构建所有工件后要运行的函数
  afterAllArtifactBuild: (buildResult) => {
    // return stampArtifacts(buildResult)
  },
  // force arch build if using electron-rebuild
//   beforeBuild: async (context) => {
//     const { appDir, electronVersion, arch } = context
//     await electronRebuild.rebuild({ buildPath: appDir, electronVersion, arch })
//     return false
//   },

  directories: {
    // app: "",应用路径
    output: "install",
    // buildResources: "installer/resources" //打包资源文件路径 图片 图标等
  },

  win: {
    target: 'nsis'
  },
  nsis: {
    deleteAppDataOnUninstall: true,
    include: "installer/win/nsis-installer.nsh"
  },

  mac: {
    target: 'dmg',
    hardenedRuntime: true,
    gatekeeperAssess: true,
    extendInfo: {
      NSAppleEventsUsageDescription: 'Let me use Apple Events.',
      NSCameraUsageDescription: 'Let me use the camera.',
      NSScreenCaptureDescription: 'Let me take screenshots.',
    }
  },
  dmg: {
    // background: "installer/mac/dmg-background.png",
    iconSize: 100,
    contents: [
      {
        x: 255,
        y: 85,
        type: "file"
      },
      {
        x: 253,
        y: 325,
        type: "link",
        path: "/Applications"
      }
    ],
    window: {
      width: 500,
      height: 500
    }
  },

  linux: {
    desktop: {
      StartupNotify: "false",
      Encoding: "UTF-8",
      MimeType: "x-scheme-handler/deeplink"
    },
    target: ["AppImage", "rpm", "deb"]
  },
  deb: {
    priority: "optional",
    afterInstall:"installer/linux/after-install.tpl",
  },
  rpm: {
    fpm: ["--before-install", "installer/linux/before-install.tpl"],
    afterInstall:"installer/linux/after-install.tpl",
  }
};

// Promise is returned
builder.build({
  targets: Platform.WINDOWS.createTarget(),
//   targets: Platform.MAC.createTarget(),
  config: options
})
.then((result) => {
  console.log(JSON.stringify(result))
})
.catch((error) => {
  console.error(error)
})