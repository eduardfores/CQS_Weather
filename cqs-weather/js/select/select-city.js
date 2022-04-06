function setCitySelect(cities){
	selectCity = document.getElementById("cities");

	for (var i = 0; i<cities.length; i++){
		var opt = document.createElement('option');
		opt.value = cities[i][1];
		opt.innerHTML = cities[i][1];
		selectCity.appendChild(opt);
	}
}

function removeCitySelect(){
	selectCity = document.getElementById("cities");
    removeAllChildNodes(selectCity);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}