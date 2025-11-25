/*********************************************
library imports
*********************************************/
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const nedb = require("@seald-io/nedb");
/// NEW LIBRARIES FOR TODAY
const cookieParser = require("cookie-parser");
const expressSession = require('express-session')
const nedbSessionStore = require('nedb-promises-session-store')
const bcrypt = require('bcrypt')

/*********************************************
library configurations:
- setting up express server via app
- setting up how the parser interprets data
- setting up where multer stores images
- setting up database files
*********************************************/
const app = express();
const urlEncodedParser = bodyParser.urlencoded({ extended: true });
const upload = multer({
  dest: "public/uploads",
});
let database = new nedb({
  filename: "database.txt",
  autoload: true,
});
//// NEW LIBRARY CONFIGURATIONS
app.use(cookieParser());

// setting up the session db creation
const nedbSessionInit = nedbSessionStore({
  connect: expressSession,
  filename: 'sessions.txt'
})
// linking app to use session db
app.use(expressSession({
  store: nedbSessionInit, 
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 // after a year, delete the session
  },
  secret: 'thisismysecretkey'
}))
let userdb = new nedb({
  filename: 'userdb.txt',
  autoload: true
})

/*********************************************
middleware setup
*********************************************/
app.use(express.static("public"));
app.use(urlEncodedParser);
app.set("view engine", "ejs");

/*********************************************
ROUTES: determining what locations are accessible via URL
*********************************************/
app.get("/", (request, response) => {
  let hundredyears = 1000 * 60 * 60 * 24 * 365 * 100;
  // NEW COOKIE: CHECK IF COOKIE EXSISTS
  if (request.cookies.visits) {
    let updatedVisits = parseInt(request.cookies.visits) + 1;
    response.cookie("visits", updatedVisits, {
      expires: new Date(Date.now() + hundredyears),
    });
  } else {
    // NEW COOKIE SETUP
    // 3 parameters:
    // 1. name of the cookie
    // 2. value we are setting it to
    // 3. object: {} when the cookie "dies"/expires
    response.cookie("visits", 1, {
      expires: new Date(Date.now() + hundredyears),
    });
  }

  let query = {};
  database.find(query).exec((err, data) => {
    response.render("index.ejs", { posts: data });
  });
});

app.post("/upload", upload.single("theimage"), (req, res) => {
  let currentDate = new Date();

  let data = {
    text: req.body.text,
    date: currentDate.toLocaleString(),
    timestamp: currentDate.getTime(),
    likes: 0,
  };

  if (req.file) {
    data.image = "/uploads/" + req.file.filename;
  }

  database.insert(data, (err, newData) => {
    console.log(newData);
    res.redirect("/");
  });
});

app.post("/like", (req, res) => {
  // NEW CHECK IF COOKIE EXISTS BEFORE LIKING
  let retrievedId = req.body.postId;

  if (req.cookies[retrievedId] == "liked!") {
    res.redirect("/");
  } else {
    let query = {
      _id: retrievedId,
    };
    let update = {
      $inc: { likes: 1 },
    };
    res.cookie(retrievedId, "liked!", {expires: new Date(Date.now() + 100000000)})
    database.update(query, update, {}, (err, numUpdated) => {
      res.redirect("/");
    });
  }
});

/////////////////////////////////////////////////
//        add new routes below this line!      //
/////////////////////////////////////////////////
app.get('/register', (req, res)=>{
  res.render('register.ejs')
})
app.post('/signup', upload.single('profilePicture'), (req, res)=>{
  
  let hashedPassword = bcrypt.hashSync(req.body.password, 10)

  let newUser = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: hashedPassword
  }

  userdb.insert(newUser, (err, insertedData)=>{
    res.redirect('/login')
  })
})
app.get('/login', (req, res)=>{
  res.render('login.ejs')
})
app.post('/authenticate', (req, res)=>{
  let loginAttempt = {
    username: req.body.username,
    password: req.body.password
  }

  let searchUser = {
    username: loginAttempt.username
  }

  userdb.findOne(searchUser, (err, foundUser)=>{
    if(foundUser == null || err){
      console.log('username not found')
      res.redirect('/login?user=null')
    } else{
      let encPass = foundUser.password
      if(bcrypt.compareSync(loginAttempt.password, encPass)){
        let session = req.session
        session.loggedInUser = foundUser.username
        res.redirect('/')
      } else{
        res.redirect('/login?password=invalid')
      }
    }
  })
})

/*********************************************
server listener for when requests are made 
to the server
- we don't really need to modify this
- needs to go at the end
*********************************************/
app.listen(6001, () => {
  console.log("server started on port 6001");
});
