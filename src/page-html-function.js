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
        <div class="issue-layout">
         ${pageData.pages
           .map(
             (page) => `
            <div class="img-wrapper">
              <img src="${page}" loading="lazy" alt="">
            </div>`
           )
           .join('')}
           </div>
           <a href="/" class="btn-link no-print">back
                  </a>
        </main>
       </body>
     </html>
     `;
};

module.exports = pageHtml;
