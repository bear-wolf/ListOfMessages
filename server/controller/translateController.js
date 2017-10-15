var fileOfData = 'data.json',
    data = require('./../'+ fileOfData),
    fs = require('fs');

var translateController = function (resource) {
    this.resource = resource;
    this.db = data;
    this.fs = fs;
}

translateController.prototype.index = function () {
    this.resource.writeHead(200);
    // this.resource.end('this is index page');
}

translateController.prototype.get = function () {
    var data = {};

    var translate = this.db.translate;

    if (translate && translate.length) {
        data = {
            status: true,
            translate: translate
        }
        this.resource.writeHead(200);
    } else {
        this.resource.writeHead(404);
    }

    this.resource.end(JSON.stringify(data));
}

module.exports = translateController;