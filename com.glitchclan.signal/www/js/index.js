function onLoad()
{
  document.addEventListener('deviceready', onDeviceReady, false);
  document.addEventListener("offline", deviceOffline, false);
  document.addEventListener("online", deviceOnline, false);
}

function onDeviceReady()
{
  alert("Please make sure location is turned on!");
  var latitudeElement    = document.getElementById("latitudeElement");
  var longitudeElement   = document.getElementById("longitudeElement");
  var altitudeElement    = document.getElementById("altitudeElement");
  var accuracyElement    = document.getElementById("accuracyElement");
  var headingElement     = document.getElementById("headingElement");
  var speedElement       = document.getElementById("speedElement");
  var timestampElement   = document.getElementById("timestampElement");
  var humanTimestamp     = document.getElementById("humanTimestamp");
  var dataStateElement   = document.getElementById("dataState");
  var statusElement      = document.getElementById("status");
  
  statusElement.innerHTML = "Device Ready!";
  setInterval(glitchGetSignal, 6000);
  
  window.plugins.sim.getSimInfo(simInfoSuccess, simInfoError);
}

function simInfoSuccess(result)
{
  var ISPElement = document.getElementById("ISPElement");
  var DSIElement = document.getElementById("Dual SIM");
  var sim1Name   = document.getElementById("sim1Name");
  var sim2Name   = document.getElementById("sim2Name");
  
  currentState = result.networkType;
  
  var Nstates = {};
  Nstates[0]  = 'Unknown connection';
  Nstates[1]  = 'GPRS connection';
  Nstates[2]  = 'EDGE connection';
  Nstates[3]  = 'UMTS connection';
  Nstates[4]  = 'CDMA: Either IS95A or IS95B connection';
  Nstates[5]  = 'EVDO revision 0 connection';
  Nstates[6]  = 'EVDO revision A connection';
  Nstates[7]  = '1xRTT connection';
  Nstates[8]  = 'HSDPA connection';
  Nstates[9]  = 'HSUPA connection';
  Nstates[10] = 'HSPA connection';
  Nstates[11] = 'iDen connection';
  Nstates[12] = 'EVDO revision B connection';
  Nstates[13] = 'LTE connection';
  Nstates[14] = 'eHRPD connection';
  Nstates[15] = 'HSPA+ connection';
  Nstates[16] = 'GSM connection';
  Nstates[17] = 'TD-SCDMA connection';
  Nstates[18] = 'IWLAN connection';

  ISPElement.innerHTML = "ISP: " + result.carrierName;
  DSIElement.innerHTML = "Dual SIM: " + result.cards.length;
  sim1Name.innerHTML   = "SIM1 ISP: " + result.cards[0].carrierName;
  sim2Name.innerHTML   = "SIM2 ISP: " + result.cards[1].carrierName;

  if(result.cards.length > 1)
  {
    ISPElement.innerHTML = "ISP: " + "Dual SIM Detected. ISPs Listed Below!";
  }
  else
  {
    ISPElement.innerHTML = "ISP: " + "Single SIM Detected. ISP Listed Below!";
  }
}

function checkNetworkType()
{
  var networkState = navigator.connection.type;
  var connectionTypeFunction = document.getElementById("connectionFunction");
  connectionTypeFunction.innerHTML = 'Connection type: ' + states[networkState];
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
      
      if(measuredDbm === 85)
      {
        dBmElement.innerHTML = 'Plugin Error: Try switching SIM 1 to 3G to fix!';
      }
      var p_dBmValue = parseInt(measuredDbm)*(-1);
      if(p_dBmValue <= 70)
      {
        qualityElement.innerHTML = 'Quality: Excellent';
        if(p_dBmValue == 1)
        {
          qualityElement.innerHTML = 'Quality: Getting ready...';
          dBmElement.innerHTML     = 'Signal: Getting Signal Strength...';
        }
      }
      else if(p_dBmValue <= 86 && p_dBmValue > 70)
      {
        qualityElement.innerHTML = 'Quality: Good';
      }
      else if(p_dBmValue <= 100 && p_dBmValue > 86)
      {
        qualityElement.innerHTML = 'Quality: Fair';
      }
      else if(p_dBmValue > 110)
      {
        qualityElement.innerHTML = 'Quality: No Signal';
      }
      else if(p_dBmValue > 100)
      {
        qualityElement.innerHTML = 'Quality: Poor';
      }
      else
      {
        qualityElement.innerHTML = 'Quality: Invalid';
      }
    }
  )
}

function onSuccess(position)
{
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
  errorCodeElement.innerHTML    = 'No Error';
  errorMessageElement.innerHTML = 'No Error';
  locTimeoutCount = 0;
}
var locTimeoutCount = 0;
var alertGiven = 0;
function onError(error)
{
  errorCodeElement.innerHTML    = 'code: '              + error.code;
  errorMessageElement.innerHTML = 'message: '           + error.message;
  locTimeoutCount = locTimeoutCount + 1;
}

function getGeoLocation()
{
  let gpsOptions = {maximumAge: 6000, timeout: 5000, enableHighAccuracy: true};
  if(locTimeoutCount > 2 && alertGiven < 1)
  {
    alert("Please make sure location is turned on!");
    alertGiven = 1;
  }
  navigator.geolocation.getCurrentPosition(onSuccess, onError, gpsOptions);
}
