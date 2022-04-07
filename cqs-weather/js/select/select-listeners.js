/**
 * This function turn on the listener to load a new city
 * 
 * @param {worker} sqlite_worker 
 */
function setCityListener(sqlite_worker){
    var cities = document.getElementById("cities");
    cities.addEventListener("change", loadNewCity, false);
    cities.worker = sqlite_worker;
}

/**
 * This function turn on the listener to load a new database
 * @param {worker} sqlite_worker 
 */
function setDateListener(sqlite_worker){
    var date = document.getElementById("date");
    date.addEventListener("change", getSQLiteData, false);
    date.worker = sqlite_worker;
}