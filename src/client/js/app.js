/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



/**
 * async POST request function.
 * It updates name of city(destination) in server side(which is run by server.js)
 *
 * @param {string} url endpoint that will trigger post request and save the data in server.
 * @param {string} nameOfCity Name of city user provides.
 * @param {string} arrivalDate arrival date user provides.
 * @return {json} newlyFormedData newly formed weather, date, and user response data in JSON
 */
 const postNameOfCityNDate = async (url,nameOfCity,arrivalDate) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nameOfCity : nameOfCity,
            arrivalDate : arrivalDate
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
    console.log(`this is name of city: ${nameOfCity}`)
    console.log(`this is name of city: ${arrivalDate}`)
    postNameOfCityNDate('/addCityNDate',nameOfCity,arrivalDate)
    
    //geo info
    fetch('http://localhost:8083/getCoordinate')
        .then(res => res.json())
        .then(function(res) {
            console.log(res.latitude)
            //weather info
            fetch('http://localhost:8083/getCurrentWeather')
    })

    
    
        // .then(res => res.json())
        // .then(function(res) {
        //     console.log(res.latitude)
        // })
        

}


export { 
    dataUploader,
    postNameOfCityNDate
}
