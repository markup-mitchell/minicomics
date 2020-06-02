const config = require('./config');
const fs = require('fs');

const addManifest = () => {
  var jsonData =
    '{"name": "spitchell minicomics", "short_name": "spitchell", "start_url": "/index.html", "display": "standalone", "background_color": "#FFFFF3", "theme_color": "#333", "orientation": "portrait-primary", "icons": [{}]}';

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
