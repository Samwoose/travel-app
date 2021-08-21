/* Global Variables */
const numOfDaysInWeek = 7
const maxNumOfDaysForForcast = 16
let dataforUI = {
    forcastDate:"",
    temperature:"",
    description:"",
    precipitation:"",
    cityName:"",
    language:"",
    region:"",
    currency:"",
    photoURL:""
}

const dateRestrictor = () =>{
    let todayDate = new Date().toISOString().split('T')[0];
    document.querySelector('#date').setAttribute('min',todayDate);
}


/**
 * Help update view in html.
 */
const fetchCurrentHelper = ()=>{
    fetch('http://localhost:8083/getCurrentWeather')
                .then(res=>res.json())
                .then(function(res){
                    dataforUI.temperature = res.temperature
                    dataforUI.description = res.description
                    dataforUI.precipitation = res.precipitation
                    dataforUI.cityName = res.cityName
                    dataforUI.forcastDate = res.forcastDate
                    fetch('http://localhost:8083/getPhotoOfCity')
                    .then(res=>res.json())
                    .then(function(res){
                        dataforUI.photoURL = res.photoURL
                        fetch('http://localhost:8083/getFactOnCountry')
                        .then(res=>res.json())
                        .then(function(res){
                            dataforUI.language = res.language
                            dataforUI.region = res.region
                            dataforUI.currency = res.currency
                            document.getElementById('forcastDate').innerHTML = "Forcast Date: " + dataforUI.forcastDate
                            document.getElementById('description').innerHTML = "Description: " + dataforUI.description
                            document.getElementById('temperature').innerHTML = "Temperature: " + dataforUI.temperature
                            document.getElementById('percipitation').innerHTML = "Percipitation: " + dataforUI.precipitation
                            document.getElementById('cityName').innerHTML = "City: " + dataforUI.cityName
                            document.getElementById('language').innerHTML = "Language: " + dataforUI.language
                            document.getElementById('region').innerHTML = "Region: " + dataforUI.region
                            document.getElementById('currency').innerHTML = "Currency: " + dataforUI.currency
                            document.getElementById('cityImage').src = dataforUI.photoURL
                            document.getElementById('cityImage').alt = "City Image"
                            document.querySelector('.holderEntry').style.width = "350px"
                            document.querySelector('.holderEntry').style.backgroundColor = "skyblue"

                        })
                    })
                })
}

/**
 * Help update view in html.
 */
const fetchFutureHelper = ()=>{
    fetch('http://localhost:8083/getFutureWeather')
                .then(res=>res.json())
                .then(function(res){
                    dataforUI.temperature = res.temperature
                    dataforUI.description = res.description
                    dataforUI.precipitation = res.precipitation
                    dataforUI.cityName = res.cityName
                    dataforUI.forcastDate = res.forcastDate
                    fetch('http://localhost:8083/getPhotoOfCity')
                    .then(res=>res.json())
                    .then(function(res){
                        dataforUI.photoURL = res.photoURL
                        fetch('http://localhost:8083/getFactOnCountry')
                        .then(res=>res.json())
                        .then(function(res){
                            dataforUI.language = res.language
                            dataforUI.region = res.region
                            dataforUI.currency = res.currency
                            document.getElementById('forcastDate').innerHTML = "Forcast Date: " + dataforUI.forcastDate
                            document.getElementById('description').innerHTML = "Description: " + dataforUI.description
                            document.getElementById('temperature').innerHTML = "Temperature: " + dataforUI.temperature
                            document.getElementById('percipitation').innerHTML = "Percipitation: " + dataforUI.precipitation
                            document.getElementById('cityName').innerHTML = "City: " + dataforUI.cityName
                            document.getElementById('language').innerHTML = "Language: " + dataforUI.language
                            document.getElementById('region').innerHTML = "Region: " + dataforUI.region
                            document.getElementById('currency').innerHTML = "Currency: " + dataforUI.currency
                            document.getElementById('cityImage').src = dataforUI.photoURL
                            document.getElementById('cityImage').alt = "City Image"
                            document.querySelector('.holderEntry').style.width = "350px"
                            document.querySelector('.holderEntry').style.backgroundColor = "skyblue"

                        })
                    })
                })
}

/**
 * async POST request function.
 * It updates name of city(destination) in server side(which is run by server.js)
 *
 * @param {string} url endpoint that will trigger post request and save the data in server.
 * @param {string} nameOfCity Name of city user provides.
 * @param {string} arrivalDate arrival date user provides.
 * @param {int} differenceInDays number of days between two dates
 * @return {json} newlyFormedData newly formed weather, date, and user response data in JSON
 */
 const postNameOfCityNDate = async (url,nameOfCity,arrivalDate,differenceInDays) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nameOfCity : nameOfCity,
            arrivalDate : arrivalDate,
            differenceInDays : differenceInDays
        }),
    });  
    try {
        const newlyFormedData = await response.json();
        return newlyFormedData
    }catch(error){
        console.log("For some reason, could not finish weather POSt request");
    }
}


/**
 * Get analysis information from server and update user interface in the view.
 * @param {object} event submit event
 */
 function dataUploader(event) {
    event.preventDefault()
    const nameOfCity = document.querySelector('#city').value;
    const arrivalDate = document.querySelector('#date').value;
    
    let differenceInDays = Client.numOfDaysCalculator(arrivalDate)
    postNameOfCityNDate('/addCityNDate',nameOfCity,arrivalDate,differenceInDays)
    
    //geo info
    fetch('http://localhost:8083/getCoordinate')
        .then(res => res.json())
        .then(function(res) {
            //weather info
            if(differenceInDays < numOfDaysInWeek){
                fetchCurrentHelper()
            }
            else if( numOfDaysInWeek <= differenceInDays && differenceInDays <= maxNumOfDaysForForcast){
                fetchFutureHelper()
            }
            else if(maxNumOfDaysForForcast < differenceInDays){
                alert('Too far to forcast')
            }      
    })
}

//disable dates in the past in calendar
dateRestrictor()

export { 
    dataUploader,
    postNameOfCityNDate,
    dateRestrictor,
}
