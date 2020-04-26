const fs = require('fs');
const config = require('./config');
const pageHtml = require('./page-html-function');

if (!fs.existsSync(config.dev.outDir)) fs.mkdirSync(config.dev.outDir);

const editions = fs.readdirSync(config.dev.editionsDir);

const createPage = (name) => {
  let pageData = {};
  pageData.zineName = name;
  pageData.frames = fs.readdirSync(`${config.dev.editionsDir}/${name}`);
  return pageData;
};

console.log(pageHtml(createPage('home learning')));
