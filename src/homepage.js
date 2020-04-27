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
        <main>
            <header>
                <h1>${config.siteName}</h1>
                <p>—</p>
                <p>by ${config.authorName}</p>
            </header>

            <ul class="gallery">
                ${pages
                  .map(
                    (page) => `<li class="gallery__item">
                    <a href="./${page.title}"><img class="thumbnail" src="${page.pages[0]}" alt=""/></a>
                    </li>`
                  )
                  .join('')}
            </ul>

            <footer>
             
            </footer>
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
