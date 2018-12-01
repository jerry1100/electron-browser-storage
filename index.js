const { app, BrowserWindow } = require('electron');

// Create an empty BrowserWindow to access browser storage
let storageWindow;
if (process.type !== 'renderer') {
  app.on('ready', () => {
    storageWindow = new BrowserWindow({ show: false });
    storageWindow.loadFile(__filename);
  });
}

/**
 * localStorage object
 */
module.exports.localStorage = {
  /**
   * Gets an item from localStorage
   * @param {string} key The key to get
   */
  getItem(key) {
    if (process.type === 'renderer') {
      return window.localStorage.getItem(key);
    }
    const code = `window.localStorage.getItem('${key}');`;
    return storageWindow.webContents.executeJavaScript(code);
  },

  /**
   * Sets an item in localStorage
   * @param {string} key The key to set
   * @param {*} value The value to set
   */
  setItem(key, value) {
    if (process.type === 'renderer') {
      return window.localStorage.setItem(key, value);
    }
    const code = `window.localStorage.setItem('${key}', '${value}');`;
    return storageWindow.webContents.executeJavaScript(code);
  },
};

/**
 * sessionStorage object
 */
module.exports.sessionStorage = {
  /**
   * Gets an item from sessionStorage
   * @param {string} key The key to get
   */
  getItem(key) {
    if (process.type === 'renderer') {
      return window.sessionStorage.getItem(key);
    }
    const code = `window.sessionStorage.getItem('${key}');`;
    return storageWindow.webContents.executeJavaScript(code);
  },

  /**
   * Sets an item in sessionStorage
   * @param {string} key The key to set
   * @param {*} value The value to set
   */
  setItem(key, value) {
    if (process.type === 'renderer') {
      return window.sessionStorage.setItem(key, value);
    }
    const code = `window.sessionStorage.setItem('${key}', '${value}');`;
    return storageWindow.webContents.executeJavaScript(code);
  },
};
