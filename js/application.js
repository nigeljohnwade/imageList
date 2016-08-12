window.app = {};

app.init = function(url, criteria){
    app.retrieveImages(url, criteria);
}
app.retrieveImages = function(url, criteria){
    ajaxUtilities.create(url, {
        done: function(xhr, data){
            var displayData = app.filterData(criteria, data);
            var templateArray = {items: displayData};
            domUtilities.getElement('#output').innerHTML = app.template('#imageListTemplate', templateArray);
        }
        },
        'GET',
        criteria
    );
}

app.filterData = function(criteria, collection){
    var returnArray = [];
    returnArray = _.filter(collection, function(datum){
        return datum.title.indexOf(criteria) > -1;
    });
    return returnArray;
}

app.template = function(templateId, context){
    var source = domUtilities.getElement(templateId).innerHTML;
    var template = Handlebars.compile(source);
    var returnHtml = template(context);
    console.log(returnHtml);
    return returnHtml;
}