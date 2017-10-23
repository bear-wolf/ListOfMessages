/**
 * Created by andrew on 2/1/17.
 */
var app,
    nconf = require("nconf"),
    express = require('express'),
    http = require('http');

app = express();

nconf.argv()
    .env()
    .file({ file: 'config.json' });

require('./boot/index')(app);
require('./routes/index')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port '+ app.get('port'));
})

process.on('exit', function (code) {
    console.log('About to exit with code:'+code);
});
process.on('finish', function() {
    console.log('request end');
});