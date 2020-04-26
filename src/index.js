const fs = require('fs');
const config = require('./config');
const pageHtml = require('./page-html-function');

if (!fs.existsSync(config.dev.outDir)) fs.mkdirSync(config.dev.outDir);

const editions = fs.readdirSync(config.dev.editionsDir);

console.log(
  pageHtml({
    zineName: 'test zine',
    frames: ['path1', 'path2', 'path3'],
  }),
);
