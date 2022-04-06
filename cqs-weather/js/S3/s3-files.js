const setDateSelect = () => {
    var listFiles = s3.listObjectsV2({ Prefix: 'databases/database' }).promise();

    listFiles.then(function (data) {
        setDateSelectHTML(data, getDate());
    })
}

function getSQLiteData(event) {
    var worker = event.currentTarget.worker;
    var date = document.getElementById("date").value;

    var params = {
        Key : date
    }
    
    destroyTempChart();
    destroyPressureChart();
    destroyHumidityChart();
    removeCitySelect();
    loadSQLite(worker, s3.getObject(params).promise());
}

function getSQLiteToday() {
    var date = getDate();
    var params = {
        Key : "databases/database"+date[0]+"-"+date[1]+"-"+date[2]+".db"
    }
    return s3.getObject(params).promise();
}

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return [dd, mm, yyyy];
}
