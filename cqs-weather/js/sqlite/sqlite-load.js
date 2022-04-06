function loadSQLite(worker, sqlFile){
    var r = new FileReader();
	r.onload = function () {
		worker.onmessage = function () {
			// Show the schema of the loaded database
			loadFile(worker, "SELECT `name`, `sql`\n  FROM `sqlite_master`\n  WHERE type='table';");
		};
        
		try {
			worker.postMessage({ action: 'open', buffer: r.result }, [r.result]);
		}
		catch (exception) {
			worker.postMessage({ action: 'open', buffer: r.result });
		}
	}

	sqlFile.then( function (data) {
        var blob = new Blob([data.Body], {type: 'binary/octet-stream'});
        r.readAsArrayBuffer(blob);
    })
}

// Run a command in the database
function loadFile(worker, commands) {
    
	worker.onmessage = function (event) {
		var results = event.data.results;

		if (!results) {
			error({message: event.data.error});
			return;
		} 

		loadCities(worker)
	}
	worker.postMessage({ action: 'exec', sql: commands });
}

function loadCities(worker){

	var commands = "SELECT * FROM City;"

	worker.onmessage = function (event) {
		var results = event.data.results;

		if (!results) {
			error({message: event.data.error});
			return;
		}

		setCitySelect(results[0].values);

		loadSQLInChart(worker, "SELECT * FROM Hourly WHERE cityIdRef = 1 ORDER BY date;");
	}

	worker.postMessage({ action: 'exec', sql: commands });
}

function loadSQLInChart(worker, commands) {

	worker.onmessage = function (event) {
		var results = event.data.results;

		if (!results) {
			error({message: event.data.error});
			return;
		}

		loadTemp(worker, results[0].values);
		loadHumidity(results[0].values);
		loadPressure(results[0].values);
	}
	worker.postMessage({ action: 'exec', sql: commands });
}

function loadTemp(worker, hourly){
	var arrayTemp = [];
	var arrayFeels = [];

	for(var i=0; i < hourly.length; i++){
		arrayTemp.push(hourly[i][1]);
	}

	for(var i=0; i < hourly.length; i++){
		arrayFeels.push(hourly[i][2]);
	}

	getWeather(worker, hourly, arrayTemp, arrayFeels);

}

function getWeather(worker, hourly, arrayTemp, arrayFeels) {

	var arrayWeather = [];

	worker.onmessage = function (event) {
		var results = event.data.results;
		var arrayIcon = [];

		if (!results) {
			error({message: event.data.error});
			return;
		}

		for(var i=0; i < results[0].values.length; i++){
			arrayIcon.push(results[0].values[i][4]);
		}
		
		setTempChart(arrayTemp, arrayFeels, arrayIcon);
	}

	for(var i=0; i < hourly.length; i++){
		arrayWeather.push(hourly[i][8]);
	}

	var command = "SELECT * FROM Weather WHERE id IN (" + arrayWeather +") ORDER BY case ";

	for(var i=0; i < arrayWeather.length; i++){
		command += " WHEN id="+arrayWeather[i]+" THEN "+i;
	}

	command += " end ASC;";

	worker.postMessage({ action: 'exec', sql: command });
}

function loadHumidity(hourly){
	var arrayHumidity = []
	for(var i=0; i < hourly.length; i++){
		arrayHumidity.push(hourly[i][4]);
	}

	setHumidityChart(arrayHumidity);
}

function loadPressure(hourly){
	var arrayPressure = [];

	for(var i=0; i < hourly.length; i++){
		arrayPressure.push(hourly[i][3]);
	}

	setPressureChart(arrayPressure);
}

function loadNewCity(event){
	var city = document.getElementById("cities").value;
	var commands = "SELECT * FROM City WHERE name = '"+city+"';";

	var worker = event.currentTarget.worker;
	worker.onmessage = function (event) {
		var results = event.data.results;

		if (!results) {
			error({message: event.data.error});
			return;
		}

		destroyTempChart();
		destroyPressureChart();
		destroyHumidityChart();
		loadSQLInChart(worker, "SELECT * FROM Hourly WHERE cityIdRef = "+results[0].values[0][0]+" ORDER BY date;");
		
	}

	worker.postMessage({ action: 'exec', sql: commands });
}
