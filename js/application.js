requirejs(["../config", "ajaxUtilities", "domUtilities", "handlebars.min", "underscore"], function(config, ajaxUtilities, domUtilities, Handlebars, _){

    window.app = {};

    var flickrUrl = {
        base: 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1',
        api_key: '&api_key=' + config.flickrApiKey
    }

    app.init = function(url, inputRef, submitRef){
        domUtilities.getElement(submitRef).addEventListener('submit', function(event){
            var _criteria = domUtilities.getElement(inputRef).value;
            url = url + '&text=' + _criteria;
            app.retrieveImages(url, _criteria);
            event && event.preventDefault();
        });
        app.retrieveImages(url + '&text=cats');
    }
    
    app.retrieveImages = function(url, criteria){
        ajaxUtilities.create(url, {
            done: function(xhr, data){
                var _data;
                _data = _.map(data.photos.photo, function(elem, index, array){
                    return {title: elem.title, thumbnailUrl: `https://farm${elem.farm}.staticflickr.com/${elem.server}/${elem.id}_${elem.secret}_t.jpg`}
                });
                var templateArray = {items: _data};
                domUtilities.getElement('#output').innerHTML = app.template('#imageListTemplate', templateArray);
            }
            },
            'GET',
            criteria
        );
    }
    
    app.template = function(templateId, context){
        var source = domUtilities.getElement(templateId).innerHTML;
        var template = Handlebars.compile(source);
        var returnHtml = template(context);
        return returnHtml;
    }
    
    app.init(flickrUrl.base + flickrUrl.api_key + '&method=flickr.photos.search', '#searchCriteria', 'form');
});