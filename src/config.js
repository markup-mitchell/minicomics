const config = {
  siteName: 'mitchcraft',
  authorName: 'Mark Mitchell',
  description: 'minicomics displayed online',
  dev: {
    static: 'src/static',
    outDir: './public',
    imageRepo: 'https://res.cloudinary.com/spitchell/upload/minicomics'
  }
};

module.exports = config;
