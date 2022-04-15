
const {contextBridge,ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('myAPI',{
    desktop:'kkk',
    handleCounter: (callback) => ipcRenderer.on('update-counter', callback)
})
console.log('preload')