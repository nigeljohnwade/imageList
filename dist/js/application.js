window.app = {};

app.init = function(url, criteria){
    app.retrieveImages(url, criteria);
}
app.retrieveImages = function(url, criteria){
    $.ajax(url, {
        success: function(data, status, xhr){
            var displayData = app.filterData(criteria, data);
            var templateArray = {items: displayData};
            $('#output').html(app.template('#imageListTemplate', templateArray));
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

app.template = function(templateId, context){
    var source = $(templateId).html();
    var template = Handlebars.compile(source);
    var returnHtml = template(context);
    console.log(returnHtml);
    return returnHtml;
}