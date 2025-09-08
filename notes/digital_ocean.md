# Web Hosting on Digital Ocean

In order to have a website that’s publicly accessible on the Internet, it needs to be hosted on a computer with a static, [public IP address](https://help.keenetic.com/hc/en-us/articles/213965789-What-is-the-difference-between-a-public-and-private-IP-address-). Our laptops generally don’t have that — they get assigned private (or local) IPs when connecting to a WiFi (or wired) network, and the public IP is a few layers “above” in the network topology. While it’s possible to expose your laptop’s IP to the internet, it’s much easier to use services which offer that as a feature.

[Digital Ocean](https://digitalocean.com) is one such provider. A few alternatives are Amazon Web Services, Google Cloud Platform, or Microsoft Azure Cloud, but for this class we will use Digital Ocean.

Digital Ocean offers a suite of different services, but for now we are only interested in **Droplets**. A droplet is a Linux-based virtual machine (VM) which can be used for web hosting (and for many other things – for all intents and purposes, it’s a full computer capable of running any software that works on Linux.) Droplets, conveniently, also have publicly exposed IP addresses, so by the end of this tutorial we’ll have a website up and running *on the internet*. 

***Note**: We are basically renting a virtual server from Digital Ocean, which generally costs money. The lowest-tier server we can rent costs $5 per month, with the first 2 months free. So **you will need a credit card to sign up** for Digital Ocean, and you will get charged a total of $10 by the end of this class (for April and May.)*

*If you don’t feel comfortable doing this for any reason, send me an email (sam.heckle@nyu.edu) and I’m happy to discuss alternatives.*

## 💧 Create a Digital Ocean droplet 💧

**Step 1:** Sign up for Digital Ocean via one of the following methods:
1. Use the [Github Student Developer Pack](https://education.github.com/pack?utm_source=github+digitalocean)
![do-student-dev.png](https://drive.google.com/uc?id=1L6yHPBpd78N7okAOP6KDwYMv01DAge7Q)
3. Use my [referral link](https://m.do.co/c/c57ec6b3cb5f)  
![do-referral.png](https://drive.google.com/uc?id=1z1fih4v76Y1lnN97FRO3-3f14ErIgVTw)
4. Make an account on [https://digitalocean.com](https://digitalocean.com) using one of your preferred methods to sign in.
![do-step-1.jpg](https://drive.google.com/uc?id=125BhOkTimMt85LVacxD1Hc5pwgli9Owf)

**Step 2:** Navigate to [https://cloud.digitalocean.com/](https://cloud.digitalocean.com/); this is your Digital Ocean control panel, and where we’ll create our droplet from. On the left-hand side menu, click on `Droplets`, and then hit the `Create Droplet` button.

![do-step-7-droplet.jpg](https://drive.google.com/uc?id=12N5gHiw_-p9jMLNw0maf457b6zaJzFUk)

**Step 6:** Configure your droplet. The image below shows my full configuration, but the only things you’ll need to change from the defaults are:

1. Choose your region: I default to New York since it is the closest one to us.
2. Choose the Datacenter: if you are not given the option to create the $4 droplet on step 6, you might need to change the datacenter here.
3. Make sure the `Ubuntu` option is chosen in the first row. Ubuntu is the Linux distribution we’ll be using for this class.
4. The version is `24.10 x64` in the dropdown menu.
5. Choose the `Basic` plan.
6. For `CPU options` make sure to choose the `Regular` option, with the $4/mo pricing package. This is the cheapest option available to us, and the computing power will be sufficient for our needs. If the $4 option is greyed out, you need to change your datacenter on step 2.
7. Under `Authentication`, make sure the `Password` option is selected (as opposed to `SSH keys`), and don’t forget to enter a password for your account on this server. **Make sure to remember this password, you’ll need it to access your droplet.**
8. You can give your droplet a name, at the bottom under `Choose a hostname`. I named mine `sam-networked-media`.
9. Everything else is fine with the default options.

![do-step-8-create-droplet-settings.png](https://drive.google.com/uc?id=1oHswSnj1GUPiP_DY4tlwz8pb4fsKoBwZ)

**Step 7:** Hit `Create Droplet` and, after a few seconds, the initialization should be complete. Notice the IP address written to the right of your droplet name, and save it somewhere (`137.184.151.138` in the image below, yours will be different). That’s where your website(s) will live.

![do-step-10-created.png](https://drive.google.com/uc?id=12OS5csJ08piPhumHGaHmCBIs5j21Ji1i)

## ⚡ Connecting to your droplet ⚡

Congratulations, you now have a server running *in the cloud!*

In order to connect to it, we will use `ssh`. `ssh` stands for “Secure Shell”, and it’s a simple (and secure) protocol for connecting to a computer remotely. Through `ssh` we get access to the remote computer’s command line.

Open up your **Terminal** (or GitBash if you are on Windows,) and type the following command (replace `YOUR_IP` with the IP address your droplet shows in the Digital Ocean interface):

```bash
ssh root@YOUR_IP
```

You will be prompted for a password – that is the root password you set when creating the Droplet in the Digital Ocean interface.

In the command above, `root` is the user we are connecting as – it’s what the Digital Ocean droplet sets up for us as a default. There’s [more to say about what the root user is on Linux](https://en.wikipedia.org/wiki/Superuser), but we won’t go into details here.

## 😵‍💫 Command line basics 😵‍💫

Since we don’t get a graphical user interface for interacting with our server, you will need to become familiar with the command line. Fortunately, 5-6 commands can get you pretty far. The most important ones we will use are:

- `pwd` → displays the path of the directory the command line is currently in. Think of the command line as a Finder window – it can only be in one folder at a time, and it can be used to open, create, modify or remove files in that folder.
- `ls` → shows the files that exist in the current directory
- `mkdir` → creates a new folder at the current path, and takes one parameter (the name of the folder.) Example usage: `mkdir MyNewFolder`
- `cd` → changes directory, it’s what we use to navigate the filesystem. It takes one parameter, see below:
    - `cd MyNewFolder` will move us inside the newly created `MyNewFolder`. This is a *local path*, meaning that `MyNewFolder` needs to exist in the current directory in order for this command to work.
    - `cd /root/MyNewFolder` will move us to the given *global path.* It’s a global path because it starts with a `/`.
    - `cd ..` will move us in the parent of the directory we’re currently in.
    - `cd ~` will move us to the home folder of the current user.
    - `cd /` will go to the very root of the file system.
- `touch` → creates a new empty file
- `cat` → displays the contents of a file, and takes one parameter – the path of the file. For example, running `cat /root/.bash_history` will show the contents of the `.bash_history` file located in the `root` folder, which happens to be the list of all commands you’ve already run in the terminal.
- `rm` → removes a file; `rm -r`, to remove a directory; USE WITH CAUTION.

**Note #1:** You can find a pretty comprehensive command line cheat sheet [here](https://www.git-tower.com/blog/command-line-cheat-sheet/). Don’t worry if it feels intimidating for now – you’ll soon get used to it.

**Note #2:** If you’re using a Mac, all these commands work on your computer as well (through the Terminal app.)

## 💻 Initial droplet setup: Installing Node JS 💻

In order to host a website on the droplet, we need to run a web server. There are many different flavors of web servers out there, but for this class we are building our own (ish) using NodeJS. Node is a Javascript-based environment used for scripting and server-side applications. Simply put, it’s the thing (one thing) that allows us to run Javascript outside of the browser. We like that, because it means we don’t need to learn a different programming language for the website’s backend: everything can be Javascript.

In order to start using node, we first need to install it on the droplet. You only need to do this step once – after it’s installed, `node` will keep living on your droplet until you manually remove it. Run the following two commands:

```bash
sudo apt-get update
sudo apt-get install nodejs npm
```

Notice in the second command that we are installing a second package called `npm` in addition to node. `npm` stands for Node Package Manager, and it’s a small piece of software which makes it *extremely easy* to use external libraries in node projects. You can learn more about `npm` [here](https://www.npmjs.com/).

In order to check whether `node` and `npm` were properly installed, run the following two commands (`-v` is a pretty standard command line argument for checking the version of a software):

`node -v` → this should output something like `v10.19.0`. Don’t worry if you have a different version.

`npm -v` → this should output something like `6.14.4`. Again, all good if your exact version is different.

*Try out: Type `node` in your terminal window and hit enter. You will have an interactive console which accepts Javascript.*

*Try out #2: Create a simple file called `script.js`, which just contains a `console.log` statement. Run that with node.*

## 🆕 Starting a node project 🆕 using Github and your local computer

Last time, we "forked" the [networked-media-starter](https://github.com/samheckle/networked-media-starter). If you do not have this, please follow the [slides from last class](https://docs.google.com/presentation/d/1ZGrevQwZkxBoFxH8uHjCjdZpVPFPg74YFdVmICGHveE/edit?slide=id.g2b3404169b8_0_30#slide=id.g2b3404169b8_0_30).

Open your folder in VS Code. Open a terminal in VS Code (Terminal menu in top right -> New Terminal). We need to navigate to the `webserver` folder in the command line. 

```sh
cd webserver
```

Once in this `webserver` folder, run:

```bash
npm init
```

and hit enter for all the questions you get asked (you can fill in answers, but the defaults work fine.) This initializes our node project.

Once the project is initialized, we need to install an external library called Express JS. [Express](http://expressjs.com/) is a small, easy to use framework which allows us to create web servers in node without having to write too much code. It’s the library that does all the heavy lifting in allowing us to create a web server.

Run the following command in order to add `express` as a dependency to the current project:

```bash
npm install express
```

At this point, if you run `ls`, you should see the following files in your folder:

- `node_modules` → this is the folder where all our project dependencies get saved. If you run `ls node_modules`, you will see a handful of results. `express` will be one of them, the other ones are dependencies of `express`.
- `package.json` → this is our node project configuration file. It specifies some metadata about our node project, as well as our dependencies. If you run `cat package.json`, you’ll be able to see that `express` appears under the `dependencies` section of the file.
- `package-lock.json` → we don’t care about this file, it’s used by node internally to keep track of exact library versions for the entire dependency tree.

This is the default barebones structure of a node project, so you should get used to seeing `node_modules` and `package.json` around. The only thing that’s missing is some actual code to define and run our web server.

## 🌐 Building and running the web server 🌐

### Uploading the server file to your droplet

In the starter code, we have a file called `webserver/server.js`. Since we created this file on our own computer, with the convenience of a graphical user interface and a nice code editor, we need a way to upload it to the droplet.

[Cyberduck](https://cyberduck.io) is a piece of software which allows us to do that, using the `SFTP` protocol. `SFTP` stands for SSH File Transfer Protocol, and it’s a widely used protocol for transferring files over the internet. 

*The Cyberduck instructions are MacOS specific. The software works on Windows too, but it has a different interface. Send me an email if you have trouble replicating these steps.*

Once you’ve downloaded and opened Cyberduck, click on the “+” icon in the bottom-left of the window to establish a new connection. 

In the dropdown at the top, pick the `SFTP (SSH File Transfer Protocol)` option, and give your connection a `nickname` in the field underneath. In the `server` field, enter the public IP address of your droplet – the same one you used to connect via ssh. Write `root` in the `username` field (remember from a previous section of this tutorial, our current user is called `root`), and type in your `password` in the next field. Once you’ve filled all these fields out, close the window.

Back in the main Cyberduck window, double-click on the newly added item, and a new Finder-like window will open, with the contents of your droplet in it. 

Navigate to your local folder on your computer, and drag all of the contents inside your `networked-media` folder from your Finder window into the correct folder in the Cyberduck window. This will copy the files to the droplet.

### Running the server

Going back to the Terminal, make sure your `ssh` connection to the droplet is still active, and, if it’s not, re-connect (`ssh root@123.456.etc`). Navigate to the project folder. When you type `ls`, you should now see the `server.js` file showing up alongside `package.json` and `node_modules`.

Start your web server by running the following command:

```bash
node server.js
```

You should see a message saying `Example app listening on port 80!` If by any chance you see a longer error instead, which mentions `Error: listen EACCES: permission denied 0.0.0.0:80`, run the server as superuser: `sudo node server.js`.

### Testing the server

Open a web browser and navigate to `[http://your.ip.address.here/test](http://your.ip.address.here/test)` (`http://137.184.151.138/test` in my case). You should see a simple page saying `Hello World!` → this is the result of the `/test` route we set up in `server.js`.

### AND FINALLY, adding .html file(s) to the server 😓

On your computer, create an `index.html` file, and add some simple content to it (or grab an .html file you already have.) If you’re looking for inspiration for creating a new one, check out the [Introduction to HTML](https://github.com/samheckle/networked-media-fa-24/blob/main/notes/html.md) tutorial. Using Cyberduck, copy the `index.html` file into the `public` directory within your web server.

Open your web browser and navigate to `http://your.ip.address.here/` (`http://137.184.151.138/` in my case,) or `http://your.ip.address.here/index.html`. You should see the HTML page contents displayed in your browser.

# 🎉 🎉 🎉 CONGRATULATIONS, YOU ARE NOW RUNNING YOUR OWN WEB SERVER 🎉 🎉 🎉

## 💤 Keeping the web server alive after you log out 💤

You will notice that if you close your terminal window, you won’t be able to access your website anymore. 

This is because of how `ssh` and shell (aka terminal) sessions work. Once we connect to our droplet, we are given “a shell” – the terminal we write in, which is a child of the `ssh` connection. When we start our web server, that process becomes a child of the shell. So, when the `ssh` connection closes, all processes that are its children, grandchildren or further down the tree get closed as well.

In order to avoid that, we need an external utility which keeps our web server running even after we disconnect. There are a handful of options, but the one we will work with is called `pm2`. It also exists in the `npm` ecosystem, so you can install it like this:

`sudo npm install --global pm2`

The `--global` flag tells `npm` to install this library for the entire filesystem, as opposed to locally for a project. `pm2` is a command-line utility, so it needs to be installed globally. We’ll get more into this later in the semester.

Navigate to the folder where your web server lives, and, instead of starting your web server with the `node server.js` command, run the following:

```bash
pm2 start server.js
```

By doing this, `pm2` becomes the manager of our node web server, and, through black magic, it makes sure the server stays on even after you disconnect from `ssh`. Give it a try!

For the first few weeks, we won’t be making any changes to the server itself, so once you have this running, there’s no need to stop or restart the server. Files uploaded in the `public` folder will automatically get picked up and updated in the browser.

Once we start making changes to the server itself, we’ll learn some more about `pm2` and best development practices & workflows.

You might also need to check the status of your server:

```bash
pm2 ls
```

You can stop your server if there are any issues :)

```bash
pm2 stop all
pm2 restart server
```

You can also kill the server if for some reason stopping and restarting doesn't work

```bash
pm2 kill
```
