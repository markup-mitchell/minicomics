// if the browser doesn't support serviceWorkers there's no point trying to execute this code

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then((reg) => {
      console.log('service worker registered', reg);
    })
    .catch((err) => {
      console.log('service worker not registered', err);
    });
}
