/**
 * Calculate number of days between arrival date and today.
 * @param {string} arrivalDate arrival date in string type. e.g. 2021-08-21
 */
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

export{
    numOfDaysCalculator
}