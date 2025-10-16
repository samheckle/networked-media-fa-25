// importing the express library
// always put imports at the top
const express = require('express')

// setting up the body parser library
const parser = require('body-parser')
const encodedParser = parser.urlencoded( {extended: true })

// setting up multer library
const multer = require('multer')
const uploadProcessor = multer( {dest: 'assets/upload/' })

// create an instance of the express app
// just like we do with let date = new Date()
const app = express()

// middleware to set up the public folder to serve basic html files
app.use(express.static('assets'))
app.use(encodedParser)
// setting the templating engine to use ejs 
app.set('view engine', 'ejs')

// a global variable array to store all of the message that come in from our client
let messages = []

let posts = []

// routes always go before the app.listen
// request: data that comes from the user / client
// response: data that goes back to the user/client
app.get('/', (request, response)=>{
    // response.send('server is working')
    // response.sendFile('htmls/guestbook.html', {root:})

    let data = {
        message: "hello",
        paths: ["path1", "path2", "path3"]
    }

    data.visible = true
    // 2 params:
    // #1: name of the .ejs file that exists in views
    // #2: data to be sent, as an object
    response.render('template.ejs', data)
})

app.get('/submit', (request, response)=>{
    // query is everything that comes after the ? in the url
    // ?guest=sam&message=hi+this+is+a+cool+site%21&submitbtn=write
    console.log(request.query.guest)

    let guest = request.query.guest

    // object that holds the data that comes in from ONE form request
    let messageData = {
        username: request.query.guest,
        text: request.query.message
    }

    messages.push(messageData)

    response.send('thank you for writing a message, ' + guest) 
})

// new route that goes after the submit route
app.get('/all-messages', (request, response)=>{
    let allMessages = ''
    for(let m of messages){
        allMessages += m.username + " says " + m.text + "<br/>"
    }
    response.send(allMessages)
})

// display my ejs file
// every ejs must have an associate app.get with a render
app.get('/post', (req, res)=>{

    // allPosts will be accessed on the ejs side
    // posts is the current array in the server
    let data = {
        allPosts: posts
    }
    res.render('post.ejs', data)
})

app.post('/upload', uploadProcessor.single('theImage') , (req, res)=>{
    console.log(req.body)

    let singlePost = {
        text: req.body.status,
    }

    let date = new Date()
    singlePost.time = date.toLocaleString()

    if(req.file){
        singlePost.imgSrc = "/upload/" + req.file.filename
    }

    // {text: stores status, time: stores time of post}
    // posts[0].text
    posts.unshift(singlePost)

    res.redirect('/post')
})

// sets up our server
// this should always go at the end of the file
app.listen(5001, ()=>{
    console.log('server started')
})