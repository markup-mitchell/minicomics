require('dotenv').config();
const fs = require('fs-extra'); // for easy dir cp
const config = require('./config');
const pageHtml = require('./page-html-function');
const addHomepage = require('./homepage');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET
});

getAllPageImages = (folder) => {
  const imageData = cloudinary.api.resources(
    // fetch from  cloudinary
    {
      type: 'upload',
      prefix: folder, // the name of the cloudinary folder,
      max_results: 500,
      context: true
    },
    function (error, result) {
      console.log(error);
    }
  );
  return imageData;
};

// make public directory

if (!fs.existsSync(config.dev.outDir)) fs.mkdirSync(config.dev.outDir);

const getIssue = (title, allImageData) => {
  const pagesData = [];
  allImageData.forEach((imageData) => {
    if (imageData.public_id.split('/')[1] === title) {
      const transformUrl = imageData.secure_url.replace(
        'upload/',
        'upload/w_425/'
      );

      const imageParams = { url: transformUrl };

      Object.assign(
        imageParams,
        !!imageData.context
          ? { alt: imageData.context.custom.alt }
          : { alt: 'Alt text pending - apologies.' }
        // might fetch other metadata by this method, eg title. not now tho
      );
      pagesData.push(imageParams);
    }
  });
  return { title: title, pages: pagesData };
};

const createComic = (issue) => {
  // issue is { title: string, url: [8 url as string] }
  const issuePath = `${config.dev.outDir}/${issue.title}`;
  if (!fs.existsSync(issuePath)) {
    fs.mkdirSync(issuePath);
  }
  fs.writeFile(`${issuePath}/index.html`, pageHtml(issue), (e) => {
    if (e) throw e;
    console.log(`${issuePath}/index.html was created successfully`);
  });
};

const publishAll = async (folder) => {
  const allImageData = await getAllPageImages(folder); // {resources: [{}]}
  const uniqueFolderPaths = new Set(
    allImageData.resources.map((imageObj) => imageObj.public_id.split('/')[1])
  ); // get subfolder from url - FRAGILE! relies on cloudinary structure
  const titles = Array.from(uniqueFolderPaths).reverse();
  const issues = titles.map((title) => getIssue(title, allImageData.resources));
  issues.forEach((issue) => createComic(issue));

  addHomepage(issues);
  fs.copy(`${config.dev.static}`, `${config.dev.outDir}`);
};

publishAll('minicomics');
