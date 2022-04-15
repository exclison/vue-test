
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

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

