function setDateSelectHTML(files){
	var selectDate = document.getElementById("date");

    for (var i = 0; i<files.Contents.length; i++){
        var opt = document.createElement('option');
        opt.value = files.Contents[i].Key;
        opt.innerHTML = files.Contents[i].Key.replace('databases/database','').replace('.db','');
        selectDate.appendChild(opt);
    }
}