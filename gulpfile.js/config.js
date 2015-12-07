var dest = "site/build";
var src = 'site/src';

module.exports = {
    dest: dest,
    browserSync: {
        server: {
            // Serve up our build folder
            baseDir: dest
        }
    },
    markup: {
        src: src + "/**/*.html",
        dest: dest
    },
    images: {
        src: src + "/img/**",
        dest: dest + "/img"
    },
    svg: {
        src: src + "/img/sprite_src/**",
        dest: dest + "/img",
        precision: 2,
        spriteFilename: "sprite.svg"
    },
    scripts: {
        src: src + "/js/**",
        dest: dest + "/js"
    },
    fonts: {
        src: src + "/fonts/**",
        dest: dest + "/fonts"
    },
    sass: {
        src: src + "/scss/**/*.{sass,scss}",
        dest: dest + "/css"
    }
};