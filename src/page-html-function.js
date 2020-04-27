const config = require('./config');

const pageHtml = (pageData) => {
  return `
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <link rel="stylesheet" href="../style.css" />
         <title>${pageData.title}</title>
       </head>
       <body>
        <main>
         ${pageData.pages
           .map((page) => `<img src="${page}" loading="lazy" alt="">`)
           .join('')}
        </main>
       </body>
     </html>
     `;
};

module.exports = pageHtml;
