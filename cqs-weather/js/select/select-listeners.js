function setCityListener(sqlite_worker){
    var cities = document.getElementById("cities")
    cities.addEventListener("change", loadNewCity, false);
    cities.worker = sqlite_worker
}

function setDateListener(sqlite_worker){
    var date = document.getElementById("date")
    date.addEventListener("change", getSQLiteDate, false);
    date.worker = sqlite_worker;
}