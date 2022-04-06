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
        var blob = new Blob([data.Body], {type: 'binary/octet-stream'})
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

		loadSQLInChart(worker, "SELECT * FROM Hourly ORDER BY date;")
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

		console.log(results)

		loadTemp(results[0].values);
		loadHumidity(results[0].values)
		loadPressure(results[0].values)

		getWeather(worker, results[0].values)
	}
	worker.postMessage({ action: 'exec', sql: commands });
}

function loadTemp(hourly){
	var arrayTemp = []
	var arrayFeels = []
	for(var i=0; i < hourly.length; i++){
		arrayTemp.push(hourly[i][1])
	}

	for(var i=0; i < hourly.length; i++){
		arrayFeels.push(hourly[i][2])
	}

	setTempChart(arrayTemp, arrayFeels)
}

function loadHumidity(hourly){
	var arrayHumidity = []
	for(var i=0; i < hourly.length; i++){
		arrayHumidity.push(hourly[i][4])
	}

	setHumidityChart(arrayHumidity)
}

function loadPressure(hourly){
	var arrayPressure = []

	for(var i=0; i < hourly.length; i++){
		arrayPressure.push(hourly[i][3])
	}

	setPressureChart(arrayPressure)
}

function getWeather(worker, hourly) {

	worker.onmessage = function (event) {
		var results = event.data.results;

		if (!results) {
			error({message: event.data.error});
			return;
		}

		console.log(results)

	}

	var arrayWeather = []

	for(var i=0; i < hourly.length; i++){
		arrayWeather.push(hourly[i][8])
	}

	var command = "SELECT * FROM Weather WHERE id IN (" + arrayWeather +");";

	worker.postMessage({ action: 'exec', sql: command });
}