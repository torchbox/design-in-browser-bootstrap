// var reactify = require('reactify');

var dest = "./site/build";
var src = './site/src';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  markup: {
    src: src + "/*.html",
    dest: dest
  },
  images: {
    src: src + "/img/**",
    dest: dest + "/img"
  },
  sass: {
    src: src + "/css/**/*.{sass,scss}",
    dest: dest
  },
  // browserify: {
  //   // A separate bundle will be generated for each
  //   // bundle config in the list below
  //   bundleConfigs: [{
  //     entries: src + '/js/main.jsx',
  //     transform: [reactify],
  //     dest: dest,
  //     outputName: 'app.js'
  //   }]
  // },
};