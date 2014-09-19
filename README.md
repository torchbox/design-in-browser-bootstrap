# Design In The Browser Bootstrap

(This file is written in Markdown, so is best read here: https://github.com/torchbox/design-in-browser-bootstrap/blob/master/README.md)

This project provides a basic webserver and development environment for designers to get started creating designs "in the browser", with real HTML templates, a simple "includes" system and tools like LiveReload to aid rapid development. It eschews the dependencies on complex setups like dynamic server-side languages, which can be a pain to configure for less technical people.


## What's included

* Server Side Include (SSI) support but *without* a need for any server-side language. This makes it easy to create modular code e.g a reuseable header/footer.
* SASS compilation support.
* Livereload support.
* An automated way to upload your changes to a staging server.
* Automated version numbering and Git tagging.

## Installation

#### Once per developer computer

* Install Node.js: Click on the big "INSTALL" button here http://nodejs.org
* From your machine's terminal:
  * Install Grunt: `npm install -g grunt grunt-cli` (may require sudo)
  * Install SASS: `sudo gem install sass` (may require sudo)

#### Once per project

* Clone this repository somewhere
* Install this project's dependencies: Within the repository directory, run `npm install` (Do *not* use sudo)


## Developing with it

* The files you will want to edit are in `site/src`. A `site/build` folder is created on the fly as part of the server process, but should be ignored.


####  Running the development server

* Run `grunt` from the command line from the same directory as this README. A small webserver will start and your browser will open at a URL displaying your site. CSS/SASS/JS and HTML files will be watched for changes, and the page refreshed automatically.


## Deploy to a staging server

#### Setup per developer computer

Grunt can upload files via SFTP but **not** to servers that require a password typed in the terminal. Instead we access the server with SSH keys. These instructions configure that access. The following needs to be done on every machine you develop on, but only once per machine - not once per project.

* On your local machine run: `cat ~/.ssh/id_rsa.pub`

If `No such file or directory`:

* On your local machine run: `ssh-keygen -t rsa -C "[your email address]"` (replacing the square bracket placeholder, duh). This generates your keys.

Once you've generated keys, or if you've generated them at some point in the past, we now install them on the staging server. This requires the "Homebrew" package manager for OSX. 

(If typing `brew` on your command line indicates the command doesn't exist, you need to install Brew using the instructions here: http://brew.sh/. )

* With Brew installed, run: `ssh-copy-id [your ldap username]@[your server]` e.g `ssh-copy-id han@rebelalliance.com`

This will automatically copy your key from your local machine to your staging server. Double check it works with a simple login test:

* On local run: `ssh [your ldap username]@[your server]`

Successfull key installation is indicated by it logging you in **without** asking for a password. That was only a test though, so you can exit again with `exit`.


#### Setup per project

The following needs to be done for this project specifically.

* Copy the file `staging-config.example.json` (found in the same dir as this README), to `staging-config.json`

Change the contents of the new file: 

* The `username` should be the one you usually use to connect to the staging server. 
* `destinationPath` is the path on the server. e.g  `/var/www/my-new-site/`. This path must end with a slash.
* `localKeyPath` is the path to the *private* half of the key you created above. If in doubt, on OSX it should read: `/Users/[your osx username]/.ssh/id_rsa`
* If you've password protected your key, `passphrase` should contain the password you used.


#### Deploying

* Run `grunt stage`
* Your site should now be available at `http://yourserver.com/[whatever folder name you gave in staging-config.json]`

Be warned: this completely replaces the previous version. If you want to deploy it to a new directory, just change the directory name in `staging-config.json` first.


## Version numbering

Run `grunt tag`, to automatically increment the version number of the designs, and create a new tag in your git repository, using that  number.

Version numbers changed with this command can be incremented as "major" e.g 1.0.0 to 2.0.0, "minor" e.g 1.0.0 to 1.1.0 or "patch" e.g 1.0.0 to 1.0.1. 

Specify what kind of degree of change you want using the syntax: `grunt tag:major`, `grunt tag:minor` or `grunt tag:patch`.


## Troubleshooting

Grunt copies the contents of `site/src` to `site/build` each time it runs, to ensure all the source files are available to the grunt server, which runs from the `site/build` directory. Any *new* files you create while the server is running won't be available in the `src/build` folder until you stop and restart the grunt server: press Ctrl+C, then type `grunt` again.


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
