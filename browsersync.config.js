'use strict';
/**
 * @module BrowserSync.options
 */
module.exports = {
    server: 'dist',
    startPath: '/patternlab/',
    open: false,
    snippetOptions: {
        async: true,
        whitelist: [],
        blacklist: ['/patternlab/index.html', '/patternlab', '/patternlab/?*'],
        rule: {
            match: /<body[^>]*>/i,
            fn: function (snippet, match) {
                return match + snippet;
            }
        }
    },
};
