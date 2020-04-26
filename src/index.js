const fs = require('fs-extra');
const config = require('./config');
const pageHtml = require('./page-html-function');
const addHomepage = require('./homepage');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'spitchell',
  api_key: '558763648963822',
  api_secret: 'wO2rPjl0i9YQ82cGgf9ul-eMZjs'
});

async function getPages(title) {
  let imageData = await cloudinary.api.resources(
    {
      type: 'upload',
      prefix: title
    },
    function (error, result) {
      console.log(error);
    }
  );
  let folders = new Set(
    imageData.resources.map((imageObj) => imageObj.public_id.split('/')[1])
  );
  // this approach extracts unique folder names in the paths of *returned results*, so empty folders are ignored
  console.log(Array.from(folders));
  return Array.from(folders);
}

const comics = getPages('minicomics');

if (!fs.existsSync(config.dev.outDir)) fs.mkdirSync(config.dev.outDir);

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

const createComic = async (title) => {
  let issue = {};
  issue.path = `${config.dev.imageRepo}/${title}`;
  issue.title = title;
  //   issue.frames = fs.readdirSync(`${config.dev.pageDir}/${title}`);
  issue.frames = await cloudinary.api.resources(
    {
      type: 'upload',
      prefix: title
    },
    function (error, result) {
      console.log(error);
    }
  );
  const comicsData = comics.map((title) => createComic(title));
  createIssuePages(comicsData);
  addHomepage(comicsData);

  return issue;
};

// const comicsData = fs
//   .readdirSync(config.dev.pageDir)
//   .map((directoryName) => createComic(directoryName));
// this should be an array of objects with the following properties: title, path,

// copy assets
// if (!fs.existsSync(`${config.dev.outDir}/assets`)) {
//   fs.mkdirSync(`${config.dev.outDir}/assets`);
// }
// fs.copySync('src/assets', `${config.dev.outDir}/assets`);
