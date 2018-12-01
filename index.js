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

class Storage {
  constructor(storageName) {
    this.storageName = storageName;
  }

  /**
   * Returns the number of items in the storage
   */
  length() {
    return execute(`window.${this.storageName}.length;`);
  }

  /**
   * Returns the key at the given index
   * @param {number} index Index to get
   */
  key(index) {
    return execute(`window.${this.storageName}.key('${index}');`);
  }

  /**
   * Returns the value for the given key
   * @param {string} key Key to get
   */
  getItem(key) {
    return execute(`window.${this.storageName}.getItem('${key}');`);
  }

  /**
   * Sets the value for the given key
   * @param {string} key Key to set
   * @param {*} value Value to set
   */
  setItem(key, value) {
    return execute(`window.${this.storageName}.setItem('${key}', '${value}');`);
  }

  /**
   * Removes the item at the given key
   * @param {string} key Key to remove
   */
  removeItem(key) {
    return execute(`window.${this.storageName}.removeItem('${key}', '${value}');`);
  }

  /**
   * Removes all keys and values
   */
  clear() {
    return execute(`window.${this.storageName}.clear();`);
  }
}

/**
 * localStorage object
 */
module.exports.localStorage = new Storage('localStorage');

/**
 * sessionStorage object
 */
module.exports.sessionStorage = new Storage('sessionStorage');
