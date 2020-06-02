require('dotenv').config();
const fs = require('fs-extra'); // for easy dir cp
const config = require('./config');
const createPage = require('./comic-html');
const addHomepage = require('./homepage-html');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET
});

// make public directory
if (!fs.existsSync(config.dev.outDir)) fs.mkdirSync(config.dev.outDir);

// copy static assets to /public
fs.copy(`${config.dev.static}`, `${config.dev.outDir}`);

let data = {}; // need to be able to export this to manifest.json for PWA. how? no idea just yet

const initialize = async (folderName) => {
  // fetch all images from  cloudinary
  Object.assign(
    data,
    await cloudinary.api.resources(
      {
        type: 'upload',
        prefix: folderName,
        max_results: 500, // the limit for a single call
        context: true // allows alt text to be fetched
      },
      function (error, result) {
        console.log(error);
      }
    )
  );
  // routes are created programmatically; we need to pull the folder names out of the fetched data
  data.uniqueFolderPaths = await new Set(
    data.resources.map((imageObj) => imageObj.public_id.split('/')[1])
  );

  // present issue numbers highest to lowest
  data.titles = await Array.from(data.uniqueFolderPaths).reverse();

  data.issues = await data.titles.map((title) =>
    getIssue(title, data.resources)
  );
  data.issues.forEach((issue) => createComic(issue));

  if ((await data.resources.length) > 400) {
    console.log(
      'WARNING: you may need to make multiple calls soon to bypass 500 result limit. https://github.com/spitchell/minicomics/projects/1#card-39360692'
    );
  }

  addHomepage(data.issues);
};

initialize('minicomics');

const getIssue = (title, resources) => {
  const pagesData = [];
  resources.forEach((resource) => {
    if (resource.public_id.split('/')[1] === title) {
      // amend url to optimise image on fetch via cloudinary transformation
      let imageParams = {
        url: resource.secure_url.replace('upload/', 'upload/w_425/')
      };
      // add alt text specified at source or default message
      Object.assign(
        imageParams,
        !!resource.context
          ? { alt: resource.context.custom.alt }
          : { alt: 'Alt text pending - apologies.' }
      );
      pagesData.push(imageParams);
    }
  });
  return { title: title, pages: pagesData };
};

const createComic = (issue) => {
  // issue is { title: string, pages: [8x { url: string, alt: string }] }
  const issuePath = `${config.dev.outDir}/${issue.title}`;
  if (!fs.existsSync(issuePath)) {
    fs.mkdirSync(issuePath);
  }
  fs.writeFile(`${issuePath}/index.html`, createPage(issue), (e) => {
    if (e) throw e;
    console.log(`${issuePath}/index.html was created successfully`);
  });
};

module.exports = data;
