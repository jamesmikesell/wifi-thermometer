
//  1. Enter sheet name where data is to be written below
var SHEET_NAME = "Device Log";

//  2. Run > setup
//  3. Deploy, "run as me", "Allow anyone"... Get the URL from the deploy screen
//  4. For future modifications, you have to hit deploy, manage deployments, edit icon, select "new version", hit deploy button on popup
//
//
// to test, run the "test" function


var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service
function test() {
  doGet({
    parameter: {
      temperature: "1.23"
    }
  })
}

function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty("key", doc.getId());
}

function doGet(e) {
  Logger.log(JSON.stringify(e));  // view parameters
  var result = ''; // assume success
  if (e.parameter == 'undefined') {
    result = 'No Parameters';
  }
  else {
    var key = SCRIPT_PROP.getProperty("key");
    Logger.log(key);
    var doc = SpreadsheetApp.openById(key);
    var sheet = doc.getSheetByName(SHEET_NAME);

    var newRow = sheet.getLastRow() + 1;
    var rowData = [];
    rowData[0] = new Date(); 											// Timestamp in column A
    for (var param in e.parameter) {
      // Logger.log('In for loop, param=' + param);
      var value = onlyAllowAlphaNumeric(e.parameter[param]);
      // Logger.log(param + ':' + e.parameter[param]);
      switch (param) {
        case 'temperature': //Parameter
          rowData[1] = (+value).toFixed(1); //Value in column B
          rowData[2] = ((value * 9 / 5) + 32).toFixed(1); //Value in column C
          result += 'Written on column B';
          result += 'Written on column C';
          break;
        case 'humidity': //Parameter
          rowData[3] = value; //Value in column D
          result += ' ,Written on column D';
          break;
        default:
          result += "unsupported parameter " + param;
      }
    }
    Logger.log(JSON.stringify(rowData));
    // Write new row below
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }
  // Return result of operation
  return ContentService.createTextOutput(result);
}
/**
* Remove leading and trailing single or double quotes
*/
function onlyAllowAlphaNumeric(value) {
  return value.replace(/[^0-9a-z\-\.]/gi, '');
}