const createWorker = () => {
    // Start the worker in which sql.js will run
    var worker = new Worker("../dist/worker.sql-wasm.js");
    worker.onerror = error;

    // Open a database
    worker.postMessage({ action: 'open' });

    return worker;
}

function error(e) {
	console.log(e);
}