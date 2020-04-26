const config = require('./config');

const pageHtml = (issue) => {
  return `
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <link rel="stylesheet" href="/public/assets/style.css" />
         <title>${issue.title}</title>
       </head>
       <body>
        <main>
         ${issue.frames
           .map(
             (frame) =>
               `<img src="${config.dev.outDir}/${issue.title}/${frame}" loading="lazy" alt="">`
           )
           .join('')}
        </main>
       </body>
     </html>
     `;
};

module.exports = pageHtml;
