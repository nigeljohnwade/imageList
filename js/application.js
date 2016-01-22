function init(){
    retrieveImages();
}
function retrieveImages(url){
    $.ajax('http://jsonplaceholder.typicode.com/photos', {
        success: function(data, status, xhr){
            console.log(data);
        }
    });
}