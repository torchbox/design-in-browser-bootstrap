# Design In The Browser Bootstrap

(This file is written in Markdown, so is best read here: https://github.com/torchbox/design-in-browser-bootstrap/blob/master/README.md)


## What it provides

* Server Side Include (SSI) support but *without* a need for any server-side language. This makes it easy to create modular code e.g a reuseable header/footer.
* SASS compilation support.
* An automated way to upload your changes to a staging server.

## Installation

### once per developer computer


* Install Node.js: Click on the big "INSTALL" button here http://nodejs.org
* From your machine's terminal:
  * Install Grunt: `npm install -g grunt` (may require sudo)
  * Install SASS: `sudo gem install sass` (may require sudo)


## Installation: once per project

  * Clone this repository somewhere
  * Install this project's dependencies: Run `npm install` (Do *not* use sudo)


## Developing with it

* The files you will want to edit are in `site/src`. A `site/build` folder is created on the fly as part of the server process, but should be ignored.


###  Running the development server

* Run `grunt` from the command line from the same directory as this README.


## Deploy to a staging server


### Setup per developer computer

The following only needs to be done on every machine you develop on, but only once per machine - not once per project.

* SSH into playground via terminal
* Run `cat ~/.ssh/authorized_keys`. 

If you know what you're doing and your public key is already in it, skip this section. Otherwise, if "No such file or directory":

* On Playground run: `mkdir ~/.ssh/ && touch ~/.ssh/authorized_keys && chmod -R 700 ~/.ssh`
* On your local machine run: `cat ~/.ssh/id_rsa.pub`

If "No such file or directory":

* On your local machine run: `ssh-keygen -t rsa -C "[your torchbox email address]"` (replacing the square bracket placeholder, duh). Hit enter every time you're asked a question. This generates your keys.

Once you've generated keys, or if you've generated them at some point in the past, we need to install them on playground. This requires the "Homebrew" package manager for OSX. 

(If typing "brew" on your command line indicates the command doesn't exist, you need to install Brew using the instructions here: http://brew.sh/. )

* With Brew installed, on local run: `ssh-copy-id [your-ldap-username]@playground`

This will automatically copy your key from your local machine to playground. Double check it works with a simple login test:

* On local run: `ssh [your-ldap-username]@playground`

Successfull key installation is indicated by it logging you in WITHOUT asking for a password. That was only a test though, so you can exit again.


### Setup per project

The following needs to be done for this project specifically

* Copy the file `staging-config.example.json` (found in the same dir as this README), to `staging-config.json`

Change the contents of the new file: 

* The `username` should be the one you usually use to connect to the staging server/playground. 
* `destinationPath` is the path on the server. e.g  `/var/www/my-new-site/`. This path must end with a slash.
* `localKeyPath` is the path to the *private* half of the key you created above. If in doubt, on OSX it should read: `/Users/[your osx username]/.ssh/id_rsa`
* If you've password protected your key, `passphrase` should contain the password you used.


### Deploying

* Run `grunt stage`
* Your site should now be available at http://your-server/[whatever folder name you gave in staging-config.json]

Be warned: this completely replaces the previous version. If you want to deploy it to a new directory, just change the directory name in `staging-config.json` first.


## Troubleshooting

Grunt copies the contents of `site/src` to `site/build` each time it runs, to ensure all the source files are available to the grunt server, which runs from the `site/build` directory. Any *new* files you create while the server is running won't be available in the `src/build` folder until you stop and restart the grunt server.