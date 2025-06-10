// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, ipcRenderer } = require('electron/renderer')

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
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

  ipcRenderer.on("main-channel", (event, arg) => {
    const appRoot = document.getElementById("app-root")
    arg.data.forEach((rmsModule) => {
      const textNode = document.createTextNode(rmsModule.id)
      appRoot.appendChild(textNode)
    })
  })