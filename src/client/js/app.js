/* Global Variables */
const numOfDaysInWeek = 7
const maxNumOfDaysForForcast = 16
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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
                fetch('http://localhost:8083/getCurrentWeather')
                .then(function(res){
                    fetch('http://localhost:8083/getPhotoOfCity')
                    .then(function(res){
                        console.log('here1')
                        fetch('http://localhost:8083/getFactOnCountry')
                    })
                })
            }
            else if( numOfDaysInWeek <= differenceInDays && differenceInDays <= maxNumOfDaysForForcast){
                fetch('http://localhost:8083/getFutureWeather')
                .then(function(res){
                    fetch('http://localhost:8083/getPhotoOfCity')
                    .then(function(res){
                        console.log('here2')
                        fetch('http://localhost:8083/getFactOnCountry')
                    })
                })
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
dateRestrictor()

export { 
    dataUploader,
    postNameOfCityNDate,
    dateRestrictor
}
