const { app, BrowserWindow, Menu, globalShortcut } = require('electron')

// Set environment
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        width: 500,
        height: 600,
        icon: `${__dirname}/assets/icons/icon_256.png`,
        resizable: isDev,
        alwaysOnTop: isDev
    })

    console.log(isDev);

    mainWindow.loadFile(`${__dirname}/app/index.html`)
}

app.on('ready', () => {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
    globalShortcut.register(isMac ? 'Command+Alt+i' : 'Ctrl+Shift+i', () => mainWindow.toggleDevTools())

    mainWindow.on('closed', () => mainWindow = null)
})

const menu = [
    ...(isMac ? [{ role: 'appMenu'}] : []),
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+W',
                click: () => app.quit()
            }
        ]
    }
]

// Mac stuff
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) 
        createMainWindow()
})

app.on('window-all-closed', function () {
  if (!isMac) 
    app.quit()
})