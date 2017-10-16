var fileOfData = 'data.json',
    data = require('./../'+ fileOfData),
    fs = require('fs');

var translateController = function (resource, db) {
    this.resource = resource;
    this.db = db;
    this.fs = fs;
    this.collection = this.db.collection('translate');
}

translateController.prototype.index = function () {
    this.resource.writeHead(200);
    // this.resource.end('this is index page');
}

translateController.prototype.save = function (data) {
    var _data,
        object = this;

    _data = {
        status: true
    };

    this.collection.save(data).toArray(function(err, docs) {
        if (err) {
            _data.status = false;
        } else {
            _data.body = docs;
            _data.length = docs.length;
        }

        object.resource.end(JSON.stringify(_data));
    });
}

translateController.prototype.get = function () {
    var data,
        object = this;

    data = {
        status: true
    };

    this.collection.find().toArray(function(err, docs) {
        if (err) {
            data.status = false;
        } else {
            data.body = docs;
            data.length = docs.length;
        }

        object.resource.end(JSON.stringify(data));
    });
}

translateController.prototype.update = function (data) {
    var data,
        object = this;

    data = {
        status: false
    };

    // this.collection.find().toArray(function(err, docs) {
    //     if (err) {
    //         data.status = false;
    //     } else {
    //         data.body = docs;
    //         data.length = docs.length;
    //     }
    //
    //     object.resource.end(JSON.stringify(data));
    // });
    object.resource.end(JSON.stringify(data));
}

translateController.prototype.remove = function (data) {
    var data,
        object = this;

    data = {
        status: false
    };

    // this.collection.find().toArray(function(err, docs) {
    //     if (err) {
    //         data.status = false;
    //     } else {
    //         data.body = docs;
    //         data.length = docs.length;
    //     }
    //
    //     object.resource.end(JSON.stringify(data));
    // });
    object.resource.end(JSON.stringify(data));
}

module.exports = translateController;