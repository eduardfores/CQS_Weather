/**
 * This function generate the select HTML of cities
 * 
 * @param {list} cities 
 */
function setCitySelect(cities){
	selectCity = document.getElementById("cities");

	for (var i = 0; i<cities.length; i++){
		var opt = document.createElement('option');
		opt.value = cities[i][1];
		opt.innerHTML = cities[i][1];
		selectCity.appendChild(opt);
	}
}

/**
 * Reset the select of cities
 */
function removeCitySelect(){
	selectCity = document.getElementById("cities");
    removeAllChildNodes(selectCity);
}

/**
 * This function remove all children of the select cities
 * @param {Element} parent 
 */
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}