/**
 *  This function create the select HTML code for date Select
 * 
 * @param {dict} files is the data recived from the listObjectsV2
 * @param {list} date is a list with the day, month and year
 */
function setDateSelectHTML(files, date){
	var selectDate = document.getElementById("date");
    var today = date[0]+"-"+date[1]+"-"+date[2];

    for (var i = 0; i<files.Contents.length; i++){
        var opt = document.createElement('option');
        var htmlStr = files.Contents[i].Key.replace('databases/database','').replace('.db','');

        opt.value = files.Contents[i].Key;
        opt.innerHTML = htmlStr;
        
        if(today == htmlStr){
            opt.selected="selected";
        }

        selectDate.appendChild(opt);
    }
}

/**
 * This function clean the Charts and charge a new database selected in the selector
 * 
 */
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