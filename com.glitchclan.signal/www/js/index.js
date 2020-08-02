function onLoad()
{
	document.addEventListener('deviceready', onDeviceReady, false);
	document.addEventListener("offline", deviceOffline, false);
  document.addEventListener("online", deviceOnline, false);
}

function onDeviceReady()
{
  var latitudeElement    = document.getElementById("latitudeElement");
  var longitudeElement   = document.getElementById("longitudeElement");
  var altitudeElement    = document.getElementById("altitudeElement");
  var accuracyElement    = document.getElementById("accuracyElement");
  var headingElement     = document.getElementById("headingElement");
  var speedElement       = document.getElementById("speedElement");
  var timestampElement   = document.getElementById("timestampElement");
  var humanTimestamp     = document.getElementById("humanTimestamp");
  var statusElement = document.getElementById("status");
  
	statusElement.innerHTML = "Device Ready!";
  setInterval(glitchGetSignal, 6000);
	
	window.plugins.sim.getSimInfo(simInfoSuccess, simInfoError);
}

function simInfoSuccess(result)
{
  var ISPElement = document.getElementById("ISPElement");
  ISPElement.innerHTML = "ISP: " + result.carrierName;
}

function simInfoError(error)
{
  var simInfoErrElement  = document.getElementById("simInfoError");
  simInfoErrElement.innerHTML = "Status is: " + error;
}

function glitchGetSignal()
{
  getSignalStrength();
  getGeoLocation();
}

function deviceOffline()
{
  var dataStateElement   = document.getElementById("dataState");
  dataStateElement.innerHTML = "OFFLINE! Data is not working.";
}

function deviceOnline()
{
  var networkState = navigator.connection.type;
  var dataStateElement   = document.getElementById("dataState");
  dataStateElement.innerHTML = "ONLINE! Data is working.";
  var connectionTypeElement = document.getElementById("connectionType");
  connectionTypeElement.innerHTML = 'Connection type: ' + networkState;
  checkConnectionType();
}

function checkConnectionType() {
  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';

  var connectionTypeFunction = document.getElementById("connectionFunction");
  connectionTypeFunction.innerHTML = 'Connection type: ' + states[networkState];
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
      else if(p_dBmValue > 110)
      {
        qualityElement.innerHTML = 'Quality: No Signal';
      }    
      else if(p_dBmValue > 100)
      {
        qualityElement.innerHTML = 'Quality: Very Poor';
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
  headingElement.innerHTML      = 'Heading: '           + position.coords.heading;
  speedElement.innerHTML        = 'Speed: '             + position.coords.speed;
  timestampElement.innerHTML    = 'Timestamp: '         + position.timestamp;
	
  var theDate = new Date(position.timestamp);
  dateString = theDate.toGMTString();
  humanTimestamp.innerHTML      = 'Date: '              + dateString;
}

function onError(error) {
  errorCodeElement.innerHTML    = 'code: '              + error.code;
  errorMessageElement.innerHTML = 'message: '           + error.message;
}

function getGeoLocation()
{
  let gpsOptions = {maximumAge: 6000, timeout: 5000, enableHighAccuracy: true};
  navigator.geolocation.getCurrentPosition(onSuccess, onError, gpsOptions);
}
