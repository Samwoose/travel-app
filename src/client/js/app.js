/* Global Variables */

// /**
//  * Get analysis information from server and update user interface in the view.
//  * @param {object} event submit event
//  */
// function handleSubmit(event) {
//     event.preventDefault()

//     // check what text was put into the form field
//     let formText = document.getElementById('name').value
//     let valiationResult = Client.urlValidator(formText);
//     //post user input form text to server
    
//     if(valiationResult == true){
//         postUserUrlHelper(formText,'/update-url')
        
//         console.log("::: Form Submitted :::")
//         fetch('http://localhost:8080/nlp-api')
//         .then(res => res.json())
//         .then(function(res) {
//             //check if the post in the given url can be analized. 
//             if(res.model == undefined){
//                 alert("Please, provide url with article or news.")
//             }
//             else{
//                 //Add analysis results and their designs in view
//                 document.getElementById('model').innerHTML = "Model: " + res.model
//                 document.getElementById('confidence').innerHTML = "Confidence: " + res.confidence
//                 document.getElementById('irony').innerHTML = "Irony: " + res.irony
//                 document.getElementById('agreement').innerHTML = "Agreement: " + res.agreement
//                 document.getElementById('subjectivity').innerHTML = "Subjective: " + res.subjectivity
//                 const resultItems = document.querySelectorAll('.result')

//                 for(let i = 0 ; i < resultItems.length ; i++){
//                     resultItems[i].style.border = "1px solid skyblue"            
//                     resultItems[i].style.padding = "20px"
//                     resultItems[i].style.fontSize = "20px"
//                 }
//             }
//         })
//     }
//     else{
//         alert("Please, provide valid URL of news or article.")
//     }
// }

// export { handleSubmit }



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
    
    fetch('http://localhost:8083/getCoordinate')
        .then(res => res.json())
        .then(function(res) {
            console.log(res.latitude)

                
        })
        

}


export { 
    dataUploader,
    postNameOfCityNDate
}
