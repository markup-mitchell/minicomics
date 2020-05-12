const config = require('./config');

const pageHtml = (pageData) => {
  return `
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <meta name="description" content="${config.description}" />
         <link rel="stylesheet" href="../style.css" />
         <title>${pageData.title}</title>
       </head>
       <body>
        <main>
         ${pageData.pages
           .map(
             (page) => `
            <div class="img-wrapper">
              <img src="${page}" loading="lazy" alt="">
            </div>`
           )
           .join('')}
           <a href="../index.html" class="btn-link">back
                  </a>
        </main>
       </body>
     </html>
     `;
};

module.exports = pageHtml;
