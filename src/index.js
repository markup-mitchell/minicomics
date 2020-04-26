const fs = require('fs-extra');
const config = require('./config');
const pageHtml = require('./page-html-function');
const addHomepage = require('./homepage');

if (!fs.existsSync(config.dev.outDir)) fs.mkdirSync(config.dev.outDir);

const createComic = (title) => {
  let issue = {};
  issue.path = `${config.dev.outDir}/${title}`;
  issue.title = title;
  issue.frames = fs.readdirSync(`${config.dev.pageDir}/${title}`);

  return issue;
};

const comicsData = fs
  .readdirSync(config.dev.pageDir)
  .map((directoryName) => createComic(directoryName));
// this should be an array of objects with the following properties: title, path,

const createIssuePages = (comicsData) => {
  comicsData.forEach((issue) => {
    if (!fs.existsSync(issue.path)) {
      fs.mkdirSync(issue.path);
    }

    fs.writeFile(`${issue.path}/index.html`, pageHtml(issue), (e) => {
      if (e) throw e;
      console.log(`${issue.path}/index.html was created successfully`);
    });
  });
};

// copy assets
if (!fs.existsSync(`${config.dev.outDir}/assets`)) {
  fs.mkdirSync(`${config.dev.outDir}/assets`);
}
fs.copySync(config.dev.pageDir, `${config.dev.outDir}/assets`);
createIssuePages(comicsData);
addHomepage(comicsData);
