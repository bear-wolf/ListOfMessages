var mongoController = require('./mongoController.js'),
    fileOfData = 'data.json',
    data = require('./../'+ fileOfData),
    fs = require('fs');

var translateController = function (resource) {
    this.resource = resource;
    this.mongoCtrl = (new mongoController);
    this.fs = fs;
}

translateController.prototype.index = function () {
    this.resource.writeHead(200);
    // this.resource.end('this is index page');
}

translateController.prototype.save = function (data) {
    var _data = {},
        object = this;

    this.mongoCtrl.connect(function (db) {
        if (!db) {
            object.resource.end(404);
            return;
        }
        var collection = db.collection('translate');

        collection.insertOne(data, function(err, docs) {
            if (err) {
                _data.status = false;
            } else {
                _data.status = true;
            }

            object.resource.end(JSON.stringify(_data));
        });
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