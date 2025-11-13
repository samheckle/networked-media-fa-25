// how do we know this is a npm project?
// A: 

// what command do we run to start an npm project?
// A: 

// what does the below chunk of code do?
// A: 
const express = require("express"); 
const multer = require("multer");   
const bodyParser = require("body-parser");
const nedb = require("@seald-io/nedb")

// what does this line do?
// A: 
const urlEncodedParser = bodyParser.urlencoded({ extended: true }); 

// what is app?
// A: 
const app = express();

// what is this configuring?
// A: 
const upload = multer({
  dest: "public/uploads",
});

// what is this configuring?
// A: 
let database = new nedb({
  filename: "database.txt",
  autoload: true 
})

// what do each of these statements do?
// write the answer next to the line of code
app.use(express.static("public"));    // A: 
app.use(urlEncodedParser);            // A: 
app.set("view engine", "ejs");        // A:

// what type of request is this? what does it do?
// A: 
app.get("/", (request, response) => {

  // how does this database search work?
  // A: 
  let query = {} 
  database.find(query).exec( (err, data)=>{
    response.render('index.ejs', {posts: data})
  } )
});

// what are the three parameters in this function?
// A: 
app.post("/upload", upload.single("theimage"), (req, res)=>{

  let currentDate = new Date()

  // what type of data structure is this?
  // A: 
  let data = {
    text: req.body.text,
    date: currentDate.toLocaleString(),
    timestamp: currentDate.getTime()
  }

  // why do we write this if statement?
  // A:
  if(req.file){
    data.image = "/uploads/" + req.file.filename
  }

  // what parameters go into this insert function?
  // A: 
  database.insert(data, (err, newData)=>{
    console.log(newData)
    res.redirect("/")
  })
})

// what does the number signify?
// A: 
// how do we access this on the web?
// A: 
app.listen(6001, () => {
  console.log("server started on port 6001");
});
