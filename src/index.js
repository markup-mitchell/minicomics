const fs = require('fs');
const config = require('./config');

const editions = fs.readdirSync(config.dev.editionsDir);
//   .map((edition) => editions.slice(0, -3));
// remove 3 character ext

console.log(editions);
