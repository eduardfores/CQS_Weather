function loadSQLite(worker, sqlFile){
    var r = new FileReader();
	r.onload = function () {
		worker.onmessage = function () {
			// Show the schema of the loaded database
			editor.setValue("SELECT `name`, `sql`\n  FROM `sqlite_master`\n  WHERE type='table';");
			execEditorContents(worker);
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

// Execute the commands when the button is clicked
function execEditorContents(worker) {
	execute(worker, editor.getValue() + ';');
}

// Run a command in the database
function execute(worker, commands) {
    
	worker.onmessage = function (event) {
		var results = event.data.results;

		if (!results) {
			error({message: event.data.error});
			return;
		}

		console.log(results)
	}
	worker.postMessage({ action: 'exec', sql: commands });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}