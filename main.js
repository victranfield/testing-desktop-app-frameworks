// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, nativeTheme, Notification} = require('electron')
const path = require('node:path')

function createWindow() {
  // try {
  app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    event.preventDefault()
    callback(true)
  })

    // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      allowDisplayingInsecureContent: true,
      
    }
  })

   // and load the index.html of the app.
   win.loadURL('https://localhost.bbc.co.uk/sounds')
  // } catch(e) {
  //   console.log(e)
  // }
}

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  console.log("hi")
  const notification = new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY })
  notification.show()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow()
//   .then(showNotification)
// })

app.whenReady().then(createWindow)
  .then(showNotification)
  .catch((e) => {
    console.log(e)
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) 
      createWindow()
    
  })
  // window.loadFile('https://www.bbc.co.uk/sounds')
// })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


