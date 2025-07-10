// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, ipcRenderer } = require('electron/renderer')
// const { renderRMSModules } = require('./renderer.js')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => {ipcRenderer.invoke('dark-mode:toggle')
    // console.log("hello")
  },
  system: () => ipcRenderer.invoke('dark-mode:system'),
})

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  document.foo = "bar"
  //setup
    ipcRenderer.on("main-channel", (event, arg) => {
      console.log("hello from main channel")
    const appRoot = document.getElementById("app-root")
    // arg.data.forEach((rmsModule) => {
    //   const textNode = document.createTextNode(rmsModule.id)
    //   // appRoot.appendChild(textNode)
      // renderRMSModules(arg.data) 
    //   console.log('data', rmsModule)
    // })
     appRoot.innerHTML = ''
    arg.data.forEach((rmsModule) => {
      const moduleElement = document.createElement('div')
      moduleElement.className = 'rms-module-grid'
      moduleElement.textContent = rmsModule.id || rmsModule.name || 'Unknown Module'
      appRoot.appendChild(moduleElement)
    })
  })
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

