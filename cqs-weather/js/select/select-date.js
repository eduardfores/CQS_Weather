function setDateSelectHTML(files, date){
	var selectDate = document.getElementById("date");
    var today = date[0]+"-"+date[1]+"-"+date[2];

    for (var i = 0; i<files.Contents.length; i++){
        var opt = document.createElement('option');
        var htmlStr = files.Contents[i].Key.replace('databases/database','').replace('.db','');

        opt.value = files.Contents[i].Key;
        opt.innerHTML = htmlStr;
        
        if(today == htmlStr){
            opt.selected="selected"
        }

        selectDate.appendChild(opt);
    }
}