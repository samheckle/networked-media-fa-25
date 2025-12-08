# Frequently Asked Questions / Debugging Tips

Please refer to this document if your project is not working. You should be getting into the habit of checking all avenues of errors before asking for help! This will make you a more resourceful developer.

You should *always* be reading error messages in the terminal or the console, this will give you more information as to what is going on.

## How to upload my project?
1. Add your files to the correct folder on cyberduck
2. Log in to your droplet using `ssh root@{your-ip-address}`
3. Navigate to your project folder in the terminal using `cd`
4. Run the server file using `pm2 start server.js --name {project}`


## My project site isn't loading!

1. Check your url for `http`. Sometimes the browser defaults to `https`, but our website isn't secure so the request will fail. Your url should look something like `http://{your-ip-address}/{project-folder}`
2. Check if the server is running with `pm2`. 
    1. Connect to your server by logging in to your server in terminal using `ssh root@{your-ip-address}`. Type in your password when prompted (remember the keystrokes aren't recorded so it does not look like you are typing)
    2. Navigate to where you are running your server. This will be where your `server.js` file is located. 
    3. List all of the servers that are running using `pm2 ls`. It should spit out something like this:
    ![img.png](https://drive.google.com/uc?id=1a8HS5ga4LXl0zjCnEc8s8JbOIU-qWGoI)
    4. If you see `errored`, it means you need to restart the server. You can do this by running
        ``` 
            pm2 kill
            pm2 start server.js
        ```
    5. If you see in the CPU column `0%`, it probably means your server file isn't updated. You can download the server.js file from cyberduck and see if it has the correct data.

## My project didn't update!
1. Make sure you saved your file in VSCode.
2. Make sure you uploaded the correct file to the server in the correct location.

## `Segmentation Fault`
1. If you run `node -v` and it gives you segmentation fault with no error, try these steps.
2. Install `nvm`
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```
3. Enable `nvm` command in your terminal
```sh
source ~/.bashrc
```
4. Install working version of `node`
```sh
nvm install v20.18.1
```
5. Set the old version as default
```sh
nvm use v20.18.1
nvm alias default v20.18.1
```
6. Ensure you have the right node
```sh
node -v
```
Whish should output `v20.18.1`
7. Re-run your project servers using `pm2`

If something happens, please send me an email so we can figure it out!
