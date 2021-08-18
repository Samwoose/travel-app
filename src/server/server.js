// Setup empty JS object to act as endpoint for all routes
let projectData = {}
let nameOfDestination = ""
let userName = "threecows"
let coordinateData = {}

// Require Express to run server and routes
var path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const fetch = require('node-fetch')
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

// const coorinateFinder = async(userName, nameOfCity)=>{
//     const url=`http://api.geonames.org/searchJSON?q=${nameOfCity}&maxRows=1&username=${userName}`;
//     if(nameOfCity != ""){
//         try{
//             const response = await fetch(url)
//             const newCoordinate = {
//                 latitude: response.data.geonames[0].lat,
//                 longitude: response.data.geonames[0].lng
//             }
//             coordinateData = newCoordinate
//             res.sendFile(coordinateData)
            
//         } catch(error){
//             console.log(`For some reason, get coordinate request couldn't finished`,error);
//         }
//     }
//     else{
//         console.log('Please provide name of destination')
//     }

// }

app.get('/getCoordinate',async function(req, res){
    const url=`http://api.geonames.org/searchJSON?q=${nameOfDestination}&maxRows=1&username=${userName}`;
    if(nameOfDestination != ""){
        try{
            const response = await fetch(url)
            // const response = await fetch('http://api.geonames.org/searchJSON?q=seoul&maxRows=1&username=threecows')
            const response_json = await response.json()
            console.log(`this is url for geo: ${url} `)
            console.log(`this is geo response: ${response_json.geonames[0].lat}`)
            const newCoordinate = {
                latitude: response_json.geonames[0].lat,
                longitude: response_json.geonames[0].lng
            }
            console.log(newCoordinate)
            coordinateData = newCoordinate
            res.send(coordinateData);
            
        } catch(error){
            console.log(`For some reason, get coordinate request couldn't finished`,error);
        }
    }
    else{
        console.log('Please provide name of destination')
    }

})

