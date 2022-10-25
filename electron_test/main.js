/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-05-17 15:07:19
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2022-10-20 10:23:38
 * @FilePath: \vue-test\electron_test\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
// console.log(process.argv)

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.resolve('./preload/index.js')
        }
    })
    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    click: () => win.webContents.send('update-counter', 1),
                    label: 'Increment',
                },
                {
                    click: () => win.webContents.send('update-counter', -1),
                    label: 'Decrement',
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu)
    // win.loadURL('https://www.electronjs.org/zh/docs/latest/tutorial/security')
    win.loadFile('index.html')
    win.webContents.openDevTools()
    // const contents = win.webContents
    // console.log(contents)
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    ipcMain.on('counter-value', (_event, value) => {
        console.log(value) // will print value to Node console
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

