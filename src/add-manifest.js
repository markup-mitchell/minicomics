const config = require('./config');
const fs = require('fs');

const addManifest = (resources) => {
  // what should this take in? last X issues?
  //   console.log(resources);
  var jsonData =
    '{"name": "spitchell minicomics", "short_name": "spitchell", "start_url": "./index.html", "display": "standalone", "background_color": "#FFFFF3", "theme_color": "#333", "icons": [{"src": "./icons/icon-72x72.png","sizes": "72x72", "type": "image/png"},{"src": "./icons/icon-96x96.png","sizes": "96x96","type": "image/png"},{ "src": "./icons/icon-128x128.png","sizes": "128x128","type": "image/png"},{ "src": "./icons/icon-144x144.png","sizes": "144x144", "type": "image/png"}, { "src": "./icons/icon-152x152.png", "sizes": "152x152", "type": "image/png" },{"src": "./icons/icon-192x192.png",  "sizes": "192x192", "type": "image/png"},{"src": "./icons/icon-384x384.png", "sizes": "384x384", "type": "image/png"},{ "src": "./icons/icon-512x512.png", "sizes": "512x512","type": "image/png" }]}';

  //  start_url could be the most recent strip

  fs.writeFile(
    `${config.dev.outDir}/manifest.json`,
    jsonData,
    'utf8',
    function (err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
      console.log('manifest.json was created successfully');
    }
  );
};

module.exports = addManifest;
