var mongoController = require('./mongoController.js'),
    enumMessage = require('./../config/message'),
    _ = require('underscore');

var baseController = function () {
    this.db = (new mongoController);
}

module.exports = baseController;