/**
 * This function create a worker with sql-wasm.js to use the sqlite in javascript
 * @returns worker of sqlite
 */
const createWorker = () => {
    // Start the worker in which sql.js will run
    var worker = new Worker("../dist/worker.sql-wasm.js");
    worker.onerror = error;

    // Open a database
    worker.postMessage({ action: 'open' });

    return worker;
}

/**
 * This function is executed when the worker has an error
 * @param {dict} e 
 */
function error(e) {
	console.log(e);
}