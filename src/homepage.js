const config = require('./config');
const fs = require('fs');

// pages is an array of objects with title and path properties

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
                    (page) => `<li class="gallery__item">
                    <a class="gallery__image-link" href="./${page.title}"><img src="${page.pages[0]}" alt=""/>
                    <img class="tap" 
                    src="./tap.svg" alt=""/>
                    </a>
                  `
                  )
                  .join('')}
                  </ul>
           <!-- <footer>
             
            </footer> -->
        </main>
        
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
