
WIP - Updated docs coming soon.

# Design In The Browser Bootstrap

This project uses Gulp to provide a basic webserver and development environment for designers to get started creating designs "in the browser", with a simple templating system.


## What's included

* SWIG templating: like Twig / Liquid / Jinja / Django templating language
* SASS CSS with auto-prefixing.
* Automatic image optimisation
* Livereload.
* An automated way to upload your site to a staging server.

## Installation

#### Once per developer computer

* Install Node.js: Click on the big "INSTALL" button here http://nodejs.org
* From your machine's terminal:
  * Install Gulp: `sudo npm install --global gulp`

#### Once per project

* Clone this repository somewhere
* Install this project's dependencies: Within the repository directory, run `npm install` (Do *not* use sudo. Some users have experienced issues where this only works *with* sudo, but ideally you shouldn't use it)
* Run `gulp`, which will open a welcome page providing further instructions.


## Developing with it

* The files you will want to edit are in `site/src`. A `site/build` folder is created on the fly as part of the server process, but should be ignored.


####  Running the development server

* Run `gulp` from the command line from the same directory as this README. A small webserver will start and your browser will open at a URL displaying your site. CSS/SASS/Js/image/HTML files will be watched for changes and the page refreshed automatically.


## Deploying to a staging server

#### Setup per developer computer

Gulp can upload files via SFTP but **not** to servers that require a password typed in the terminal. Instead we access the server with SSH keys. These instructions configure that access. The following needs to be done on every machine you develop on, but only once per machine - not once per project.

* On your local machine run: `cat ~/.ssh/id_rsa.pub`

If `No such file or directory`:

* On your local machine run: `ssh-keygen -t rsa -C "[your email address]"` (replacing the square bracket placeholder, duh). This generates your keys.

Once you've generated keys, or if you've generated them at some point in the past, we now install them on the staging server. This requires the "Homebrew" package manager for OSX. 

(If typing `brew` on your command line indicates the command doesn't exist, you need to install Brew using the instructions here: http://brew.sh/. )

With Brew installed, run:

* `brew install ssh-copy-id`
* `ssh-copy-id -i ~/.ssh/id_rsa [your ldap username]@[your server]` e.g `ssh-copy-id -i ~/.ssh/id_rsa han@rebelalliance.com`

(If you're familiar enough with SSH to have created a key *not* called "id_rsa", obviously ssh-copy-id that other key instead)

This will automatically copy your key from your local machine to your staging server. Double check it works with a simple login test:

* On local run: `ssh [your ldap username]@[your server]`

Successfull key installation is indicated by it logging you in **without** asking for a password. That was only a test though, so you can exit again with `exit`.


#### Setup per project

The following needs to be done for this project specifically.

* Copy the file `staging-ssh-config.example.js` (found in the same dir as this README), to `staging-ssh-config.js`

Change the contents of the new file: 

* `host` is the hostname your staging server
* The `user` should be the username you usually use to connect to the staging server. 
* `remotePath` is the path on the server where you want everything to go. e.g  `/var/www/my-new-site`. This path must *not* end with a slash. The folder you choose does *not* need to exist already.
* `key` is the path to the *private* half of the key you created above. If in doubt, on OSX it should read: `/Users/[your osx username]/.ssh/id_rsa`
* If you've password protected your key, `passphrase` should contain the password you used.


#### Deploying

(NB: you do NOT need to create the directory on the remote server. This will be done for you automatically).

* Run `gulp stage`
* Your site should now be available at `http://yourserver.com/[whatever folder name you gave in staging-ssh-config.js]`

Be warned: this completely replaces the previous version. If you want to deploy it to a new directory, just change the directory name in `staging-ssh-config.js` first.


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


### Files not appearing on site

New files added to a folder while Gulp is already running _should_ get copied to the `build` folder automatically, but occasionally won't. Kill the Gulp task (Ctrl+C) and re-run `gulp` to resolve this.


## License

Copyright (c) 2014 Torchbox Ltd

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
