/**
 * This function get the database names and create the DateSelect in HTML with these name files
 * 
 */
const setDateSelect = () => {
    var listFiles = s3.listObjectsV2({ Prefix: 'databases/database' }).promise();

    listFiles.then(function (data) {
        setDateSelectHTML(data, getDate());
    })
}

/**
 * This funciton return a promise of the database file to charge it in sqlite wasm
 * 
 * @returns promise of .db file
 */
function getSQLiteToday() {
    var date = getDate();
    var params = {
        Key : "databases/database"+date[0]+"-"+date[1]+"-"+date[2]+".db"
    }
    return s3.getObject(params).promise();
}

/**
 * This function generate the date of today
 * 
 * @returns a list with day, month and year
 */
function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return [dd, mm, yyyy];
}
