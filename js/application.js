window.app = {};

app.init = function(url, criteria){
    app.retrieveImages(url, criteria);
}
app.retrieveImages = function(url, criteria){
    $.ajax(url, {
        success: function(data, status, xhr){
            var displayData = app.filterData(criteria, data);
            console.log(displayData);
        }
    });
}

app.filterData = function(criteria, collection){
    var returnArray = [];
    returnArray = _.filter(collection, function(datum){
        return datum.title.indexOf(criteria) > -1;
    });
    return returnArray;
}