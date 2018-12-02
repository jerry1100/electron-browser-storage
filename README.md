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
