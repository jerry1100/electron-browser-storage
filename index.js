const { app, BrowserWindow } = require('electron');

// Create an empty BrowserWindow for localStorage access
let storageWindow;
if (process.type !== 'renderer') {
  app.on('ready', () => {
    storageWindow = new BrowserWindow({ show: false });
    storageWindow.loadFile(__filename);
  });
}

/**
 * Gets an item from localStorage
 * @param {string} key The key to get
 */
module.exports.getItem = key => {
  if (process.type === 'renderer') {
    return window.localStorage.getItem(key);
  }
  const code = `window.localStorage.getItem('${key}');`;
  return storageWindow.webContents.executeJavaScript(code);
};

/**
 * Sets an item in localStorage
 * @param {string} key The key to set
 * @param {*} value The value to set
 */
module.exports.setItem = (key, value) => {
  if (process.type === 'renderer') {
    return window.localStorage.setItem(key, value);
  }
  const code = `window.localStorage.setItem('${key}', '${value}');`;
  return storageWindow.webContents.executeJavaScript(code);
};
