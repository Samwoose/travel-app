//Use .env file for private values
const dotenv = require('dotenv')
dotenv.config()
// Setup empty JS object to act as endpoint for all routes
let userName = process.env.USER_NAME_GEO
let apiKeyWather = process.env.API_KEY_WEATHER
let apiKeyPhoto = process.env.API_KEY_PHOTO
let nameOfDestination = ""
let coordinateNCodeData = {}
let arrivalDate = ""
let weatherData = {}
let differenceInDays = -1  //random initial value
let factsData = {}
let photoData = {}
// Require Express to run server and routes
var path = require('path')
const express = require('express')
const fetch = require('node-fetch')

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

app.post('/addCityNDate', (req,res)=>{
    nameOfDestination = req.body.nameOfCity
    arrivalDate = req.body.arrivalDate
    differenceInDays = req.body.differenceInDays
    console.log(`this is name of des: ${nameOfDestination}`)
    console.log(`this is arrival date: ${arrivalDate}`)
    console.log(`this is difference in days: ${differenceInDays}`)
})

app.get('/getCoordinate',async function(req, res){
    const url=`http://api.geonames.org/searchJSON?q=${nameOfDestination}&maxRows=1&username=${userName}`;
    if(nameOfDestination != ""){
        try{
            const response = await fetch(url)
            const response_json = await response.json()
            console.log(`this is url for geo: ${url} `)
            console.log(`this is geo response: ${response_json.geonames[0].lat}`)
            const newCoordinateNCode = {
                latitude: response_json.geonames[0].lat,
                longitude: response_json.geonames[0].lng,
                countryCode: response_json.geonames[0].countryCode
            }
            console.log(newCoordinateNCode)
            coordinateNCodeData = newCoordinateNCode
            res.send(coordinateNCodeData);
            
        } catch(error){
            console.log(`For some reason, get coordinate request couldn't be finished`,error);
        }
    }
    else{
        console.log('Please provide name of destination')
    }

})

app.get('/getCurrentWeather',async function(req, res){
    const url=`https://api.weatherbit.io/v2.0/current?lat=${coordinateNCodeData.latitude}&lon=${coordinateNCodeData.longitude}&key=${apiKeyWather}&include=minutely`;
    if(nameOfDestination != "" && arrivalDate !=""){
        try{
            const responseWeather = await fetch(url)
            const responseWeather_json = await responseWeather.json()
            console.log(`this is url for weather: ${url} `)
            console.log(`this is weather response: ${responseWeather_json.data[0].temp}`)
            const newWeather = {
                 temperature: responseWeather_json.data[0].temp,
                 description: responseWeather_json.data[0].weather.description,
                 precipitation: responseWeather_json.data[0].precip,
                 cityName: responseWeather_json.data[0].city_name
            }
            console.log(newWeather)
            weatherData = newWeather
            res.send(weatherData);
            
        } catch(error){
            console.log(`For some reason, get weather request couldn't be finished`,error);
        }
    }
    else{
        console.log('Please provide name of destination, and arrival date')
    }

})

app.get('/getFutureWeather',async function(req, res){
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${coordinateNCodeData.latitude}&lon=${coordinateNCodeData.longitude}&key=${apiKeyWather}`
    if(nameOfDestination != "" && arrivalDate !=""){
        try{
            const responseWeather = await fetch(url)
            const responseWeather_json = await responseWeather.json()
            console.log(`this is url for future weather: ${url} `)   
            console.log(`this is weather response: ${responseWeather_json.data[differenceInDays+1].valid_date}`)
            const newWeather = {
                 temperature: responseWeather_json.data[differenceInDays+1].temp,
                 description: responseWeather_json.data[differenceInDays+1].weather.description,
                 precipitation: responseWeather_json.data[differenceInDays+1].precip,
                 cityName: responseWeather_json.city_name
            }
            console.log(newWeather)
            weatherData = newWeather
            res.send(weatherData);
            
        } catch(error){
            console.log(`For some reason, get weather request couldn't be finished`,error);
        }
    }
    else{
        console.log('Please provide name of destination, and arrival date')
    }
})

app.get('/getPhotoOfCity',async function(req, res){
    if(nameOfDestination != "" && arrivalDate !=""){
        const url = `https://pixabay.com/api/?key=${apiKeyPhoto}&q=${nameOfDestination}&image_type=photo`
        try{
            const responseCityPhoto = await fetch(url)
            const responseCityPhoto_json = await responseCityPhoto.json()
            console.log(`this is url for city photo: ${url} `)
            console.log(`this is photo response: ${responseCityPhoto_json.hits[0].previewURL}`)
               
            const newPhoto = {
                 photoURL: responseCityPhoto_json.hits[0].previewURL
            }
            console.log(newPhoto)
            photoData = newPhoto
            res.send(photoData);       
        } catch(error){
            console.log(`For some reason, get weather request couldn't be finished`,error);
        }
    }
    else{
        console.log('Please provide name of destination, and arrival date')
    }
})


app.get('/getFactOnCountry',async function(req, res){
    if(coordinateNCodeData != {}){
        const url = `https://restcountries.eu/rest/v2/alpha/${coordinateNCodeData.countryCode}`
        try{
            const responseFacts = await fetch(url)
            const responseFacts_json = await responseFacts.json()
            console.log(`this is url for fact: ${url}`)   
            const newFacts = {
                 language: responseFacts_json.languages[0].name,
                 region: responseFacts_json.region,
                 currency: responseFacts_json.currencies[0].code
            }
            
            factsData = newFacts
            console.log(factsData)
            res.send(factsData);       
        } catch(error){
            console.log(`For some reason, get fact request couldn't be finished`,error);
        }
    }
    else{
        console.log('Please acquire coordinate and country code first.')
    }
})
