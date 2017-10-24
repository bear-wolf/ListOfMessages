var nconf = require("nconf");

module.exports = function (app) {
    nconf.set('urlOfClient', 'http://localhost:4200');
    nconf.set('db', 'dbMessage'); //dbMessage
    nconf.set('portDb', '27017');
}
