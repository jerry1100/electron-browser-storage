# electron-browser-storage
Access [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) from the Electron Main process.

## Install
```shell
npm install electron-browser-storage
```

## Usage
The methods are all promise-based and have the same code signature as the methods from the [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface.

 The only exception is that [`.length`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/length) is implemented as a method `.length()`.
```javascript
// In main process
const { localStorage, sessionStorage } = require('electron-browser-storage');

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
```
