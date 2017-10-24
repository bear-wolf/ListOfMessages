/**
 * Created by andrew on 10/24/17.
 */
var mongoController = require('./mongoController');

module.exports = function (app) {

    app.get('/install', function (req, res) {
        (new mongoController(res)).install();
    });
}