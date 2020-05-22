const config = require('./config');
const fs = require('fs');

// pages is an array of objects with title and path properties

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const homepage = (pages) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.description}" />
        <title>${config.siteName}</title>
        <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
        <main class='p4'>
            <header>
                <!-- <h1>${config.siteName}</h1> -->
            </header>

            <ul class="gallery">
                ${pages
                  .map(
                    (
                      page
                    ) => `<li class="gallery__item" style="transform:rotate(${randomInt(
                      -5,
                      5
                    )}deg);">
                    <a class="gallery__image-link" href="./${
                      page.title
                    }"><img src="${page.pages[0]}" alt=""/></a>
                  `
                  )
                  .join('')}
                  </ul>
           <!-- <footer>
             
            </footer> -->
        </main>
        <svg class="defs-only">
  <filter id="duotone" color-interpolation-filters="sRGB"
          x="0" y="0" height="100%" width="100%">
    <feColorMatrix type="matrix"
      values="0.95 0 0 0  0.05 
              0.65 0 0 0  0.15  
              0.15 0 0 0  0.50 
                0  0 0 1  0" />
  </filter>
</svg>
    </body>
</html>
`;

const addHomepage = (pages) => {
  fs.writeFile(`${config.dev.outDir}/index.html`, homepage(pages), (e) => {
    if (e) throw e;
    console.log(`index.html was created successfully`);
  });
};

module.exports = addHomepage;
