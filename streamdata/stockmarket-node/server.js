var streamdataio = require('./sdk/streamdataio-node');
var jsonPatch = require('fast-json-patch');
var print = require('node-print');

function server(){
  // targetUrl is the JSON API you wish to stream
  // you can use this example API which simulates updating stocks prices from a financial market
  var targetUrl = 'http://stockmarket.streamdata.io/prices';

  // appToken is the way Streamdata.io authenticates you as a valid user.
  // you MUST provide a valid token for your request to go through.
  var appToken = 'YmVjYWI0MDYtMjdmZC00MWVlLTg0NzAtMjgzYmEwMTUyNjMw'; //替换app token
  var headers = [];

  eventSource = streamdataio.createEventSource(targetUrl, appToken, headers);
  var result = [];

  eventSource.onData(function (data) {
      console.log("data received");
      // memorize the fresh data set
      result = data;
      print.printTable(result);
    }).onPatch(function (patch) {
      // display the patch
      console.log("patch: ", patch);
      // apply the patch to data using json patch API
      jsonPatch.applyPatch(result, patch);
      // do whatever you wish with the update data
      print.printTable(result);
    }).onError(function (error) {
      console.log('ERROR!', error);
      eventSource.close();
    });

  eventSource.open();
}

console.log('starting');
server();
