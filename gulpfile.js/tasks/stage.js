var gulp = require('gulp');
var sftp = require('gulp-sftp');
var colors = require('colors');
var config = require('../config');

try {
    var sshConfig = require('../../staging-ssh-config');
} catch (e) {
    if (e.code == 'MODULE_NOT_FOUND') {
        console.error("You need to create a 'staging-ssh-config.js' file".red);
    }
    process.exit();
}
 
gulp.task('stage', ['images', 'sass', 'markup'], function () {
    return gulp.src(config.dest + '/**/*')
        .pipe(sftp({
            host: sshConfig.host,
            user: sshConfig.user,
            key: sshConfig.key,
            passphrase: sshConfig.passphrase,
            remotePath: sshConfig.remotePath.replace(/\/$/,'')
        }));
});