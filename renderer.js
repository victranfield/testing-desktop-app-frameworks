import react from "react";
import { createRoot } from 'react-dom/client';
import App from './App';
import { RouterProvider } from '@tanstack/react-router';

const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked!'

new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () => { document.getElementById('output').innerText = CLICK_MESSAGE }


  document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
  })
  
  document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
  })

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  } else {
    console.error('React root container not found');
  }
});


 //function on window/document
 //call from preload
 //main can't see renderer
 //preload before renderer

 //renderer js required by the page
 //renderer there in a script tag
 //document create Element

 // Function to create and show notifications (uses window/document)
function showNotification() {
  if (window.Notification) {
    const notification = new window.Notification(NOTIFICATION_TITLE, { 
      body: NOTIFICATION_BODY 
    })
    
    notification.onclick = () => {
      const outputElement = document.getElementById('output')
      if (outputElement) {
        outputElement.innerText = CLICK_MESSAGE
      }
      console.log(CLICK_MESSAGE)
    }
  }
}

// Function to handle RMS module data rendering
  function renderRMSModules(modules) {
  const appRoot = document.getElementById('app-root')
  console.log(appRoot)
  if (appRoot && Array.isArray(modules)) {
    // Clear existing content
    appRoot.innerHTML = ''
    

    modules.forEach((rmsModule) => {
      const moduleElement = document.createElement('div')
      moduleElement.className = 'rms-module-grid'
      moduleElement.textContent = rmsModule.id || rmsModule.name || 'Unknown Module'
      appRoot.appendChild(moduleElement)
    })
  }

};

// module.exports = {renderRMSModules}
  // import './app.jsx';
