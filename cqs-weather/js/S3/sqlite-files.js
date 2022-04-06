/**
 * This function return all posts saved in the /posts directory from our S3.
 * 
 * @returns data object (json) with posts from S3
 */
 const setDateSelect = () => {
    var listFiles = s3.listObjectsV2({ Prefix: 'databases/database' }).promise();

    listFiles.then(function (data) {
        var selectDate = document.getElementById("date");

        for (var i = 0; i<data.Contents.length; i++){
            var opt = document.createElement('option');
            opt.value = data.Contents[i].Key;
            opt.innerHTML = data.Contents[i].Key.replace('databases/database','').replace('.db','');
            selectDate.appendChild(opt);
        }
    })
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