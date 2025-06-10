// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, nativeTheme, Notification, ipcRenderer} = require('electron')
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
  win.loadFile('./index.html')
  win.webContents.openDevTools()
  // } catch(e) {
  //  console.log(e)

  ipcMain.handle("dark-mode:toggle", () => {console.log("hello from main")})
  // win.webContents.send("main-channel", "hello from main")

  return win

  }

  // })


  
// }

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  console.log("hi")
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow()
//   .then(showNotification)
// })

app.whenReady()
  .catch((e) => {
    console.log(e)
  })

app.on('activate', async () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

let rmsData

    try {
        const response = await fetch('https://rms.api.bbc.co.uk/v2/experience/inline/listen/sign-in')
        rmsData = await response.json()
        

    } catch (error) {
      console.log(error);
    }


    
    if (BrowserWindow.getAllWindows().length === 0) 
    {
      const win = createWindow()
      win.webContents.send("main-channel", rmsData)
      showNotification()
    }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


