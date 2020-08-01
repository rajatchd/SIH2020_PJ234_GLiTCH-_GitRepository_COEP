function onLoad()
{
	document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady()
{
  var latitudeElement = document.getElementById("latitudeElement");
  var longitudeElement = document.getElementById("longitudeElement");
  var altitudeElement = document.getElementById("altitudeElement");
  var accuracyElement = document.getElementById("accuracyElement");
  var altAccuracyElement = document.getElementById("altAccuracyElement");
  var headingElement = document.getElementById("headingElement");
  var speedElement = document.getElementById("speedElement");
  var timestampElement = document.getElementById("timestampElement");

  var statusElement = document.getElementById("status");
  statusElement.innerHTML = "Device Ready!";
  setInterval(myProcess, 1000);
}

function myProcess()
{
  getSignalStrength();
  getGeoLocation();
}

function getSignalStrength()
{
  var dBmElement = document.getElementById("dBm");
  dBmElement.innerHTML = 'Current Signal Strength is: '+"Getting Signal Strength..."+' dBm';

  window.SignalStrength.dbm
  (
    function(measuredDbm)
    {
      var dBmElement = document.getElementById("dBm");
      var qualityElement = document.getElementById("quality");
      dBmElement.innerHTML = 'Current Signal Strength is: '+measuredDbm+' dBm';
      var p_dBmValue = parseInt(measuredDbm)*(-1);
      if(p_dBmValue <= 70)
      {
        qualityElement.innerHTML = 'Quality: Excellent';
      }
      else if(p_dBmValue <= 85 && p_dBmValue > 70)
      {
        qualityElement.innerHTML = 'Quality: Good';
      }
      else if(p_dBmValue <= 100 && p_dBmValue > 85)
      {
        qualityElement.innerHTML = 'Quality: Fair';
      }
      else if(p_dBmValue > 100)
      {
        qualityElement.innerHTML = 'Quality: Poor';
      }
      else if(p_dBmValue > 110)
      {
        qualityElement.innerHTML = 'Quality: No Signal';
      }
      else
      {
        qualityElement.innerHTML = 'Quality: Invalid';
      }
    }
  )
}

function onSuccess(position) {
  latitudeElement.innerHTML     = 'Latitude: '          + position.coords.latitude;
  longitudeElement.innerHTML    = 'Longitude: '         + position.coords.longitude;
  altitudeElement.innerHTML     = 'Altitude: '          + position.coords.altitude;
  accuracyElement.innerHTML     = 'Accuracy: '          + position.coords.accuracy;
  altAccuracyElement.innerHTML  = 'Altitude Accuracy: ' + position.coords.altitudeAccuracy;
  headingElement.innerHTML      = 'Heading: '           + position.coords.heading;
  speedElement.innerHTML        = 'Speed: '             + position.coords.speed;
  timestampElement.innerHTML    = 'Timestamp: '         + position.timestamp;
}

function onError(error) {
  errorCodeElement.innerHTML    = 'code: '              + error.code;
  errorMessageElement.innerHTML = 'message: '           + error.message;
}

function getGeoLocation()
{
  let gpsOptions = {maximumAge: 300000, timeout: 1000, enableHighAccuracy: true};
  navigator.geolocation.getCurrentPosition(onSuccess, onError, gpsOptions);
}

// These two callbacks are for geolocation.
/*function onSuccess(position) {
  alert('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
}
*/

// onError Callback receives a PositionError object
/*
function onError(error) {
  alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}
*/