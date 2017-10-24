var mongoController = require('./../module/mongoDB/mongoController.js');

var baseController = function () {
    this.db = (new mongoController);
}

module.exports = baseController;