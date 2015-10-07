var dest = "./site/build";
var src = './site/src';

module.exports = {
    dest: dest,
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
        src: src + "/scss/**/*.{sass,scss}",
        dest: dest + "/css"
    }
};