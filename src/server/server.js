// Setup empty JS object to act as endpoint for all routes
projectData = {};
nameOfDestination = ""

// Require Express to run server and routes
var path = require('path')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));



// Setup Server
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8083, function () {
    console.log('Example app listening on port 8083!')
})

app.post('/addCity', (req,res)=>{
    nameOfDestination = req.body.nameOfCity
    console.log(`this is name of des: ${nameOfDestination}`)
})