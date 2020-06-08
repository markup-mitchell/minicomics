const config = require('./config');
const fs = require('fs');

// issues = {title: string, pages: [{url: string, alt: sting},]}
// there are 8 objects in each pages array

const homepage = (issues) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.description}" />
        <title>${config.siteName}</title>
        <link rel="stylesheet" href="style.css"/>
        <link rel="manifest" href="manifest.json"/>
        <!-- ios support -->
        <link rel="apple-touch-icon" href="/icons/icon-96x96.png"/>
        <!-- could link to more for device to choose -->
        <meta name="apple-mobile-web-app-status-bar" content="#333"/>
        <meta name="theme-color" content="#333"/>
    </head>
    <body>
        <main class='p4'>
            <header>
                <!-- <h1>${config.siteName}</h1> -->
            </header>

            <ul class="gallery">
                ${issues
                  .map((issue) => {
                    // hide issues named X* from homepage
                    return issue.title[0] === 'X'
                      ? null
                      : `<li class="gallery__item">
                    <a class="gallery__image-link" href="./${issue.title}"><img src="${issue.pages[0].url}" alt="${issue.pages[0].alt}"/>
                    <img class="tap" 
                    src="./tap.svg" alt=""/>
                    </a>
                  `;
                  })
                  .join('')}
                  </ul>
           <!-- <footer>
             
            </footer> -->
        </main>
        <!-- empty script tag (must include space) is to resolve a chrome bug that fires CSS transitions on page load --> 
        <script> </script>  <!-- needed with script below? -->
        <script src="./app.js"></script>
    </body>
</html>
`;

const addHomepage = (issues) => {
  fs.writeFile(`${config.dev.outDir}/index.html`, homepage(issues), (e) => {
    if (e) throw e;
    console.log(`index.html was created successfully`);
  });
};

module.exports = addHomepage;
