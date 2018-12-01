const { app, BrowserWindow } = require('electron');

// Create an empty BrowserWindow to access browser storage
let storageWindow;
if (app.isReady()) {
  storageWindow = new BrowserWindow({ show: false });
  storageWindow.loadFile(__filename);
} else {
  app.on('ready', () => {
    storageWindow = new BrowserWindow({ show: false });
    storageWindow.loadFile(__filename);
  });
}

// Execute code in the BrowserWindow
function execute(code) {
  return storageWindow.webContents.executeJavaScript(code);
}

function Storage(storageName) {
  /**
   * Returns the number of items in the storage
   */
  this.length = () => execute(`window.${storageName}.length;`);

  /**
   * Returns the key at the given index
   * @param {number} index Index to get
   */
  this.key = index => execute(`window.${storageName}.key('${index}');`);

  /**
   * Returns the value for the given key
   * @param {string} key Key to get
   */
  this.getItem = key => execute(`window.${storageName}.getItem('${key}');`);

  /**
   * Sets the value for the given key
   * @param {string} key Key to set
   * @param {*} value Value to set
   */
  this.setItem = (key, value) => execute(`window.${storageName}.setItem('${key}', '${value}');`);

  /**
   * Removes the item at the given key
   * @param {string} key Key to remove
   */
  this.removeItem = key => execute(`window.${storageName}.removeItem('${key}');`);

  /**
   * Removes all keys and values
   */
  this.clear = () => execute(`window.${storageName}.clear();`);
}

/**
 * localStorage object
 */
module.exports.localStorage = new Storage('localStorage');

/**
 * sessionStorage object
 */
module.exports.sessionStorage = new Storage('sessionStorage');
