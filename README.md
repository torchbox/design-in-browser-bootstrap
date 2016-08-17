
WIP.

# Design In The Browser Bootstrap

This project provides a starting point for prototypes, with tooling and opinion on CSS and JS structure to allow for rapid development.


## What's included

* [SWIG templating](https://github.com/node-swig/swig-templates): like Twig / Liquid / Jinja / Django templating language.
* [SASS](http://sass-lang.com/) CSS with [auto-prefixing](https://github.com/postcss/autoprefixer).
* [Browsersync](https://www.browsersync.io).
* [Rollup](https://rollupjs.org) and [Babel](https://babeljs.io) for ES2015 support with module loading.
* Consideration for images, currently copying the directory only - to avoid slowdowns and non-essential dependancies.
* An automated way to upload your site to a staging server using [dploy](https://github.com/LeanMeanFightingMachine/dploy).

## Installation

#### Once per developer computer

* Install Node.js LTS: http://nodejs.org (version 4.x.x)

#### Once per project

* Clone this repository to a new directory and `cd` into it.
* Run `rm -rf .git && git init && git add . && git commit -m "First commit"` in the root of your new project to remove existing git links with this repository and create a fresh project with the directory as is committed.
* Install this project's dependencies: Within the repository directory, run `npm install`


## Developing with it

* Source files for developing your project are in `site` and the distribution folder for the compiled assets is `dist`. Any changes made to files in the `dist` directory will be overitten.
* When running the Bootstrap, node will;
	* Lint the source files.
	* Build CSS, JS and HTML from the source files.
	* Start a local server instance with browser-sync, allowing multiple devices/browsers to be updated when source files are saved.


####  Starting Local development

* Run `npm run dev` from the project root to start development scripts. This process will continue to watch files/folders in the source directory - to stop this process press `ctrl + c`


## Troubleshooting

### Installation
Node has a habit of getting its directory permissions confused on OSX, resulting in errors like: 

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

The key here is `npm ERR! Error: EACCES` and the solution is explained here:
https://github.com/npm/npm/wiki/Troubleshooting#permission-error


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
