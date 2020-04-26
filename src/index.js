const fs = require('fs');
const config = require('./config');
const pageHtml = require('./page-html-function');

if (!fs.existsSync(config.dev.outDir)) fs.mkdirSync(config.dev.outDir);

const editions = fs.readdirSync(config.dev.editionsDir);

const createPageData = (name) => {
  let pageData = {};
  pageData.zineName = name;
  pageData.frames = fs.readdirSync(`${config.dev.editionsDir}/${name}`);
  return pageData;
};

const createAllPages = (editions) => {
  editions.forEach((edition) => {
    let editionPath = `${config.dev.outDir}/${edition}`;
    if (!fs.existsSync(editionPath)) {
      fs.mkdirSync(editionPath);
    }
    fs.writeFile(
      `${editionPath}/index.html`,
      pageHtml(createPageData(edition)),
      (e) => {
        if (e) throw e;
        console.log(`${editionPath}/index.html was created successfully`);
      },
    );
    console.log(editionPath);
  });
};

logstuff = (string) => string;
createAllPages(editions);
