const data = {
  zineName: 'test zine',
  frames: ['path1', 'path2', 'path3'],
};

const pageHtml = (data) => {
  let images = data.frames
    .map((frame) => `<img src="./content/${frame}" loading="lazy" alt="">`)
    .join('');

  return `
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <link rel="stylesheet" href="./style.css" />
       <title>${data.zineName}</title>
     </head>
     <body>
      <main>
         ${images}
      </main>
     </body>
   </html>
   `;
};

module.exports = pageHtml;
