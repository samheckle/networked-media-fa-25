// imports the configurations set up in the .env
// allows us to use process.env. to access variables in .env file
require('dotenv').config()

// importing the masto.js library, which connects to mastodon for us
const m = require('masto')

// this stores our login information and which server we are connecting to
const masto = m.createRestAPIClient({
    url: "https://networked-media.itp.io/",
    accessToken: process.env.TOKEN  // we are accessing TOKEN in .env file
})

// add the request to db
async function retrieveData(){
    const url = 'http://206.189.195.111:7001/all-posts'
    const response = await fetch(url)
    const json = await response.json()
    // const posts = json.posts
    const posts = [{text: '💖'}, {text: '👍'}, {text:'🗣️'}, {text:'💡'}]
    let randNum = Math.floor(Math.random() * (posts.length))
    let randText = posts[randNum].text
    makeStatus(randText)
}

async function makeStatus(textStatus){

    const status = await masto.v1.statuses.create({
        status: textStatus,
        visibility: "private",
    })

    console.log(status.url)
}

setInterval( ()=>{
    // makeStatus()
    retrieveData()
}, 3000)
// makeStatus()
// retrieveData()