const fs = require('fs-extra'); // for easy dir cp
const config = require('./config');
const pageHtml = require('./page-html-function');
const addHomepage = require('./homepage');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'spitchell',
  api_key: '558763648963822',
  api_secret: 'wO2rPjl0i9YQ82cGgf9ul-eMZjs'
});

getTitles = async (title) => {
  let imageData = await cloudinary.api.resources(
    {
      type: 'upload',
      prefix: title
    },
    function (error, result) {
      console.log(error);
    }
  );
  const folders = new Set(
    imageData.resources.map((imageObj) => imageObj.public_id.split('/')[1])
  );
  // this approach extracts unique folder names in the paths of *returned results*, so empty folders are ignored
  //   console.log(imageData);
  const titles = Array.from(folders);
  return titles;
};

// make public directory

if (!fs.existsSync(config.dev.outDir)) fs.mkdirSync(config.dev.outDir);

const getIssue = async (title) => {
  let allPages = await cloudinary.api.resources(
    {
      type: 'upload',
      prefix: `minicomics/${title}`
    },
    function (error, result) {
      console.log(error);
    }
  );
  const imageUrls = allPages.resources.map((page) => page.url);
  return { title: title, pages: imageUrls };
  //   typing of return object?
};

getTitles('minicomics');
getIssue('home learning');

const createComic = (pageData) => {
  // pageData is { title: string, url: [8 url as string] }
  const issuePath = `${config.dev.outDir}/${pageData.title}`;
  if (!fs.existsSync(issuePath)) {
    fs.mkdirSync(issuePath);
  }
  fs.writeFile(`${issuePath}/index.html`, pageHtml(pageData), (e) => {
    if (e) throw e;
    console.log(`${issuePath}/index.html was created successfully`);
  });
};

createComic({
  title: 'home learning',
  pages: [
    'http://res.cloudinary.com/spitchell/image/upload/v1587931282/minicomics/home%20learning/0-cover_lpppjg.jpg',
    'http://res.cloudinary.com/spitchell/image/upload/v1587931281/minicomics/home%20learning/1-literacy_jjyrkf.jpg',
    'http://res.cloudinary.com/spitchell/image/upload/v1587931281/minicomics/home%20learning/2-aeronautics_affsfr.jpg',
    'http://res.cloudinary.com/spitchell/image/upload/v1587931281/minicomics/home%20learning/3-encryption_gor7aa.jpg',
    'http://res.cloudinary.com/spitchell/image/upload/v1587931281/minicomics/home%20learning/4-art-and-design_eh8xym.jpg',
    'http://res.cloudinary.com/spitchell/image/upload/v1587931281/minicomics/home%20learning/5-maths-1_uqnqes.jpg',
    'http://res.cloudinary.com/spitchell/image/upload/v1587931281/minicomics/home%20learning/6-maths-2_gosi7v.jpg',
    'http://res.cloudinary.com/spitchell/image/upload/v1587931281/minicomics/home%20learning/7-10000ad_umrqjs.jpg'
  ]
});

// const createIssuePages = (comicsData) => {
//   comicsData.forEach((issue) => {
//     if (!fs.existsSync(issue.path)) {
//       fs.mkdirSync(issue.path);
//     }

//     fs.writeFile(`${issue.path}/index.html`, pageHtml(issue), (e) => {
//       if (e) throw e;
//       console.log(`${issue.path}/index.html was created successfully`);
//     });
//   });
// };

// const createComic = async (title) => {
//   const comicsData = comics.map((title) => createComic(title));
//   createIssuePages(comicsData);
//   addHomepage(comicsData);

//   return issue;
// };

// const comicsData = fs
//   .readdirSync(config.dev.pageDir)
//   .map((directoryName) => createComic(directoryName));
// this should be an array of objects with the following properties: title, path,

// copy assets
// if (!fs.existsSync(`${config.dev.outDir}/assets`)) {
//   fs.mkdirSync(`${config.dev.outDir}/assets`);
// }
// fs.copySync('src/assets', `${config.dev.outDir}/assets`);
