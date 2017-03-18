
# Design In The Browser Bootstrap, Patternlab edition!

This project provides a starting point for prototypes, with tooling and an opinion on CSS and JS structure to allow for rapid development utilising Patternlab ensuring all work is as transferable and as maintainable as possible.

## What's required

It is assumed the developers computer is running OSX or Linux. Depending on your setup you may already have the below installed;

* [Node.js](http://nodejs.org) (version 4.x.x)
* [PHP](http://www.php.net/) (version 5.5+)
* Optional: [Yarn](https://yarnpkg.com/en/docs/install)

## What's included

* [Patternlab-PHP](https://github.com/pattern-lab/edition-php-twig-standard): Currently the most complete and stable version of patternlab, and supports [twig](http://twig.sensiolabs.org/).
* [SASS](http://sass-lang.com/) CSS with [auto-prefixing](https://github.com/postcss/autoprefixer).
* [Browsersync](https://www.browsersync.io) for autoreloading.
* [Rollup](https://rollupjs.org) and [Babel](https://babeljs.io) for ES2015 support with module loading.
* Rollup plugins (`rollup.config.js`):
  * eslint
  * uglifyjs with sourcemaps (disabled by default)
  * support for using any installed node modules on the webiste
  * display file size information
* Examples in `/site/javascript/main.js` showing...
  * how to import ES6 modules (`point.js`)
  * how to import CommonJS modules (`vendor/jquery.js` via `globals.js`)
  * how to expose variables like `jQuery` globally (`globals.js`)
  * how to import plain old javascript files that might depend on global variables (`vendor/jquery-test-plugin.js`)
  * how to use external global variables without importing them (`main.js` + `.eslintrc`)
* Consideration for images, currently copying the directory only - to avoid slowdowns and non-essential dependancies. We encourage using SVG for UI vectors and pre-optimised UI photograph assets.
* An automated way to upload your site to a staging server using [dploy](https://github.com/LeanMeanFightingMachine/dploy).
* [Build commands](#build-scripts) for generating testable or deployable assets only

## Installation

To start a prototype using this bootstrap;

- [ ] **Get the files:** Clone this repository to a new directory, for example;
`git clone https://github.com/torchbox/design-in-browser-bootstrap.git new-project`.
- [ ] **Name the project:** Open `package.json` and replace the `name` with your project name [following npm guidelines](http://browsenpm.org/package.json#name).
- [ ] **Setup git**: Run `npm run git:init` in the root of your new project to remove existing git links with this repository and create a fresh project with the directory as is committed.
- [ ] **Install dependencies** Run `yarn install` to run the install process. `npm install` will work too, see [section about yarn below](#using-yarn).


## Developing with it

* To start the development environment `npm run lab` - to stop this process press `ctrl + c`.
* This will start Browsersync and open your default browser after the startup process is complete. You can change this configuation by modifying the `browsersync.config.js` file, documented here https://www.browsersync.io/docs/options.
* Source files for developing your project are in `site` and the distribution folder for the compiled assets is `dist`. Any changes made to files in the `dist` directory will be overwritten.

### Using yarn

* Yarn is the recommended way to install and upgrade node modules. It's like npm but [handles dependencies better](http://stackoverflow.com/questions/40057469/what-is-the-difference-between-yarn-lock-and-npm-shrinkwrap#answer-40057535).
* Install yarn itself: https://yarnpkg.com/en/docs/install
* Install all packages from `package.json`: `yarn install`
* Add new packages with yarn: `yarn add --dev package_name` (this will add it to `package.json` and `yarn.lock` too)
* Upgrade packages: `yarn upgrade-interactive`
* Keep using `npm` for running npm scripts. Although `yarn run` seems to work as well but `npm-run-all` might not use yarn, so stick to `npm run` for now.


## Deploying it

### Deploy script

You can take advantage of the nodejs package [dploy](https://github.com/LeanMeanFightingMachine/dploy) to upload the `/dist` directory. To do so you will need to;

 * Make a copy of `example.dploy.yaml` and name it `dploy.yaml`.
 * Modify the `host` `user` and `path.remote` variables.
 * Run `npm run deploy` to start the deployment process.

### Build scripts

To only build assets for either development or production you can use

 * `npm run build` To build development assets
 * `npm run build:prod` To build assets with minification and vendor prefixes

## Troubleshooting

### Installation
If you see the following error you can resolve node permissions using these steps: https://github.com/npm/npm/wiki/Troubleshooting#permission-error

```
npm WARN package.json globalwitness@0.0.1 No repository field.
npm ERR! Error: EACCES, mkdir '/Users/Dave/.npm/depd/1.0.0'
npm ERR!  { [Error: EACCES, mkdir '/Users/Dave/.npm/depd/1.0.0']
npm ERR!   errno: 3,
npm ERR!   code: 'EACCES',
npm ERR!   path: '/Users/Dave/.npm/depd/1.0.0',
npm ERR!   parent: 'connect' }
npm ERR!
npm ERR! Please try running this command again as root/Administrator.

```

## Technical Debt

 - 30 minute timeout from patternlab is hardcoded and within the vendor directory, a value has been modified in vendor/pattern-lab/core/src/PatternLab/Console/Commands/WatchCommand.php

## License

Copyright (c) 2016 Torchbox Ltd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
