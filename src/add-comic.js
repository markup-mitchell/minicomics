const config = require('./config');
const fs = require('fs');

// pageData = {title: string, pages: [{url: string, alt: string}]}

const addIssue = (issueData) => {
  const issuePath = `${config.dev.outDir}/${issueData.title}`;
  if (!fs.existsSync(issuePath)) {
    fs.mkdirSync(issuePath);
  }

  const issueHtml = `
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <meta name="description" content="${config.description}" />
         <link rel="stylesheet" href="../style.css" />
         <link rel="manifest" href="manifest.json"/>
         <title>${issueData.title}</title>
       </head>
       <body>
        <main>
        <div class="issue-layout">
         ${issueData.pages
           .map(
             (page) => `
            <div class="img-wrapper">
              <img src="${page.url}" loading="lazy" alt='${page.alt}' >
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
  fs.writeFile(`${issuePath}/index.html`, issueHtml, (e) => {
    if (e) throw e;
    console.log(`${issuePath}/index.html was created successfully`);
  });
};

module.exports = addIssue;
