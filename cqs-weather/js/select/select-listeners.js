function setCityListener(sqlite_worker){
    var cities = document.getElementById("cities")
    cities.addEventListener("change", loadNewCity, false);
    cities.worker = sqlite_worker
}