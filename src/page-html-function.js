const pageHtml = (issue) => {
  //   let images = issue.frames
  //     .map((frame) => `<img src="./content/${frame}" loading="lazy" alt="">`)
  //     .join('\n');
  //   console.log(issue);
  return `
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <link rel="stylesheet" href="./style.css" />
         <title>${issue.title}</title>
       </head>
       <body>
        <main>
         ${issue.frames
           .map(
             (frame) => `<img src="./content/${frame}" loading="lazy" alt="">`
           )
           .join('')}
        </main>
       </body>
     </html>
     `;
};

module.exports = pageHtml;
