# electron-browser-storage
Access [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) from the Electron Main process.

## Install
```shell
npm install electron-browser-storage
```

## Usage
The methods are promise-based and have the same code signature as the [`Storage` interface methods](https://developer.mozilla.org/en-US/docs/Web/API/Storage#Properties). The only exception is that [`.length`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/length) is implemented as a method `.length()`.

**Note**: storage methods must be called **after** the app's [`ready`](https://electronjs.org/docs/api/app#event-ready) event.
```javascript
// In main process
const { localStorage, sessionStorage } = require('electron-browser-storage');

app.on('ready', async () => {
  // Async/await
  await localStorage.setItem('favorite_number', 12);
  await localStorage.getItem('favorite_number'); // '12'
  await localStorage.key(0); // 'favorite_number'
  await localStorage.length(); // 1
  await localStorage.removeItem('favorite_number');
  await localStorage.clear();

  // Promises
  sessionStorage.setItem('favorite_color', 'blue')
    .then(() => sessionStorage.getItem('favorite_color')) // 'blue'
    .then(() => sessionStorage.key(0)) // 'favorite_color'
    .then(() => sessionStorage.length()) // 1
    .then(() => sessionStorage.removeItem('favorite_color'))
    .then(() => sessionStorage.clear());
});
```

## API
Promise-based versions of the [`Storage` interface methods](https://developer.mozilla.org/en-US/docs/Web/API/Storage#Properties).

### `Storage.length()`
Returns a promise that resolves to the number of items in the storage.

### `Storage.key(index)`
Returns a promise that resolves to the key at the given index.

### `Storage.getItem(key)`
Returns a promise that resolves to the value for the given key.

### `Storage.setItem(key, value)`
Sets the value for the given key and returns a promise that resolves when complete.

### `Storage.removeItem(key)`
Removes the item at the given key and returns a promise that resolves when complete.

### `Storage.clear()`
Removes all keys and values and returns a promise that resolves when complete.

## Security Concerns
Under the covers, this uses [`webContents.executeJavaScript()`](https://electronjs.org/docs/api/web-contents#contentsexecutejavascriptcode-usergesture-callback) to access `localStorage` and `sessionStorage` in the renderer process.
```javascript
// This is what the call to setItem() looks like
localStorage.setItem = (key, value) => {
  return win.webContents.executeJavaScript(`window.localStorage.setItem('${key}', '${value}');`);
};
```

Because nothing is being escaped, **be careful** when saving user input, since code injection is possible.
```javascript
// Example of code injection
const userInput = `'); someInjectedCode(); ('`;
await localStorage.setItem('user_name', userInput);

// Resulting in this getting executed
win.webContents.executeJavaScript(`window.localStorage.setItem('user_name', ''); someInjectedCode(); ('');`);
```

I'm still trying to figure out how to get around this. If you have any ideas, feel free to DM me or [open an issue](https://github.com/jerry1100/electron-browser-storage/issues/new).
