Twitter-Machina
=============================
A Twitter API REST + Stream prototype

Vagrant Setup
-----

## Installation
* Install VirtualBox 4.3.2 ([https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads))
* Install Vagrant 1.3.5 ([http://downloads.vagrantup.com/](http://downloads.vagrantup.com/))


## Notes
* Once the instance is built via `vagrant up`, you'll want to run things from within the vagrant instance, that is, while ssh'ed into the machine via `vagrant ssh` since that's where everything is installed.

* You can, however, edit the files in the project from your host machine in your editor of choice since the project on your host machine is mapped to the vagrant instance at ~/workspace.

* If there are any conflicting services running on your host machine (couchdb, node, nginx, etc.), you'll want to stop them while the vagrant instance is running.

* If you need to restart your host machine you can save the vm state with `vagrant suspend` and restore it with `vagrant resume`

* There are currently some stability issues with VirtualBox in OS X Mavericks. If you get an error when running `vagrant up`, try `sudo /Library/StartupItems/VirtualBox/VirtualBox restart`



App Setup
-----

1. Clone this repo.

2. Install Vagrant dependencies
	* Install VirtualBox 4.3.2 ([https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads))
	* Install Vagrant 1.3.5 ([http://downloads.vagrantup.com/](http://downloads.vagrantup.com/))

3. Run Vagrant
	* Add the following line to your /etc/hosts: `192.168.33.10 twittersentiment.local.sosolimited.com` 
	* `cd vagrant`
	* Build and provision the vagrant instance: `vagrant up`
	* SSH into the instance: `vagrant ssh`

4. Install project dependencies 

## Install libraries needed for canvas
* ```$ sudo apt-get update ```
* ```$ sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++```

## Install project dependencies 
	* Navigate to workspace/ and call:
   * ```npm install```

5. Run app by calling:
  * ```node serverApp.js```

6. See it work in your browser at:
  * http://localhost:3000/

## Additional steps need to edit stylesheets
* ```sudo apt-get install git```
* ```sudo npm install -g grunt-cli```
* ```sudo npm install -g bower```
* ```bower install```

Once that all passes through, you can then use grunt.
```grunt watch```
```grunt less```
```grunt concat```
```grunt uglify```



Dev Notes
-----

* App is read only on User’s data. We can’t post on behalf of user. We can only pull tweets.
* When we go live, need to change app’s callback url in dev.twitter.com and in serverApp.js
