
# Design In The Browser Bootstrap, Patternlab edition!

This project provides a starting point for prototypes, with tooling and opinion on CSS and JS structure to allow for rapid development utilising Patternlab.

## What's required

It is assumed the developers computer is running OSX or Linux. Depending on your setup you may already have the below installed;

* [Node.js](http://nodejs.org) (version 4.x.x)
* [PHP](http://www.php.net/) (version 5.5+)

## What's included

* [Patternlab-PHP](https://github.com/pattern-lab/edition-php-twig-standard): Currently the most complete and stable version of patternlab, and supports [twig](http://twig.sensiolabs.org/).
* [SASS](http://sass-lang.com/) CSS with [auto-prefixing](https://github.com/postcss/autoprefixer).
* [Browsersync](https://www.browsersync.io).
* [Rollup](https://rollupjs.org) and [Babel](https://babeljs.io) for ES2015 support with module loading.
* Consideration for images, currently copying the directory only - to avoid slowdowns and non-essential dependancies.
* An automated way to upload your site to a staging server using [dploy](https://github.com/LeanMeanFightingMachine/dploy).

## Installation

* Clone this repository to a new directory and `cd` into it.
* Run `rm -rf .git && git init && git add . && git commit -m "First commit"` in the root of your new project to remove existing git links with this repository and create a fresh project with the directory as is committed.
* Install this project's dependencies: Within the repository directory, run `npm install`


## Developing with it

```
After running `npm run lab` you will need to navigate manually to the `/patternlab/` directory in your browser e.g: http://localhost:3000/patternlab/ 
```

* To start the development environment `npm run lab` - to stop this process press `ctrl + c`
* Source files for developing your project are in `site` and the distribution folder for the compiled assets is `dist`. Any changes made to files in the `dist` directory will be overitten.


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
