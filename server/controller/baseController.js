var mongoController = require('./mongoController.js');

var baseController = function () {
    this.db = (new mongoController);
}

module.exports = baseController;