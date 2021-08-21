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

const numOfDaysCalculator = (arrivalDate) =>{
    //test
    const splittedDate = arrivalDate.split('-')
    //reform date
    const reformedDate = splittedDate[1] + '/' + splittedDate[2] + '/' + splittedDate[0]
    // To set two dates to two variables
    const todayDate = new Date().toLocaleString().split(',')[0]
    let todayDateObj = new Date(todayDate)
    let reformedDateObj = new Date(reformedDate);
         
    // To calculate the time difference of two dates
    let differenceInTime = reformedDateObj.getTime() - todayDateObj.getTime();
         
    // To calculate the no. of days between two dates
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return parseInt(differenceInDays)
}

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
                        console.log('here1')
                        dataforUI.photoURL = res.photoURL
                        fetch('http://localhost:8083/getFactOnCountry')
                        .then(res=>res.json())
                        .then(function(res){
                            dataforUI.language = res.language
                            dataforUI.region = res.region
                            dataforUI.currency = res.currency
                            // console.log(`this is data for ui1 : ${dataforUI.temperature}`)
                            // console.log(`this is data for ui2 : ${dataforUI.description}`)
                            // console.log(`this is data for ui3 : ${dataforUI.precipitation}`)
                            // console.log(`this is data for ui4 : ${dataforUI.cityName}`)
                            // console.log(`this is data for ui5 : ${dataforUI.photoURL}`)
                            // console.log(`this is data for ui6 : ${dataforUI.language}`)
                            // console.log(`this is data for ui7 : ${dataforUI.region}`)
                            // console.log(`this is data for ui8 : ${dataforUI.currency}`)
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
                        console.log('here1')
                        dataforUI.photoURL = res.photoURL
                        fetch('http://localhost:8083/getFactOnCountry')
                        .then(res=>res.json())
                        .then(function(res){
                            dataforUI.language = res.language
                            dataforUI.region = res.region
                            dataforUI.currency = res.currency
                            // console.log(`this is data for ui1 : ${dataforUI.temperature}`)
                            // console.log(`this is data for ui2 : ${dataforUI.description}`)
                            // console.log(`this is data for ui3 : ${dataforUI.precipitation}`)
                            // console.log(`this is data for ui4 : ${dataforUI.cityName}`)
                            // console.log(`this is data for ui5 : ${dataforUI.photoURL}`)
                            // console.log(`this is data for ui6 : ${dataforUI.language}`)
                            // console.log(`this is data for ui7 : ${dataforUI.region}`)
                            // console.log(`this is data for ui8 : ${dataforUI.currency}`)
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
    }); //pay attention that the temperature from API is converted to Celsius unit. 
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
    
    let differenceInDays = numOfDaysCalculator(arrivalDate)
    // console.log(`splitted date: ${splittedDate[0]}`)
    // console.log(`splitted date: ${splittedDate[1]}`)
    // console.log(`splitted date: ${splittedDate[2]}`)
    console.log(`This is number of days: ${differenceInDays}`)
    console.log(`this is name of city: ${nameOfCity}`)
    console.log(`this is name of city: ${arrivalDate}`)
    postNameOfCityNDate('/addCityNDate',nameOfCity,arrivalDate,differenceInDays)
    
    //geo info
    fetch('http://localhost:8083/getCoordinate')
        .then(res => res.json())
        .then(function(res) {
            console.log(res.latitude)
            //weather info
            // fetch('http://localhost:8083/getFutureWeather')
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

    
    
        // .then(res => res.json())
        // .then(function(res) {
        //     console.log(res.latitude)
        // })
        

}

//disable dates in the past in calendar
// dateRestrictor()

export { 
    dataUploader,
    postNameOfCityNDate,
    dateRestrictor,
    numOfDaysCalculator
}
