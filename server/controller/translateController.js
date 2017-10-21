var util = require('util'),
    baseCtrl = require('./baseController');

var mongoController = require('./mongoController.js'),
    fileOfData = 'data.json',
    enumMessage = require('./../config/message'),
    data = require('./../'+ fileOfData),
    fs = require('fs');

var translateController = function (resource) {
    translateController.super_.apply(this, arguments);
    this.resource = resource;
    this.fs = fs;
    this.entity = 'translate';
}

util.inherits(translateController, baseCtrl);

translateController.prototype.index = function () {
    this.resource.writeHead(200);
    // this.resource.end('this is index page');
}

translateController.prototype.save = function (json) {
    var _this = this;

    this.saveToDB(_this.entity, json, function (data) {
        var _data = {};

        if (data.error) {
            _data.status = false;
            _data.message = data.message;
        } else {
            _data.status = true;
        }
        _this.resource.end(JSON.stringify(_data));
    });
}

translateController.prototype.get = function () {
    var _this = this;

    this.getFromDB(_this.entity, function (data) {
        var _data = {};

        if (data.error) {
            _data.status = false;
            _data.message = data.message;
        } else {
            _data.status = true;
            _data.body = data.body;
            _data.count = data.count;
        }
        _this.resource.end(JSON.stringify(_data));
    });
}

translateController.prototype.getById = function (id) {
    var _this = this;

    this.connectToDB(_this.entity, function (data) {
        var _data = {};

        if (!data.status) {
            _data.status = false;
            _this.resource.end(JSON.stringify(_data));
        }

        data.collection.find({
            '_id' : new _this.mongoCtrl.mongodb.ObjectID(id)
        }).toArray(function(err, docs) {
            if (err) {
                _data.status = false;
            } else {
                _data.status = true;
                _data.body = docs;
                _data.count = docs.length
            }

            data.db.close();
            _this.resource.end(JSON.stringify(_data));
        });
    })
}


translateController.prototype.remove = function (json) {
    var _this = this;

    this.mongoCtrl.connect(function (data) {
        var collection,
            _data = {};

        if (!data.status) {
            _this.resource.end(404);
        } else {
            collection = data.db.collection(_this.entity);

            collection.deleteOne({
                _id: new _this.mongoCtrl.mongodb.ObjectID(json.id)
            },
            function (err, result) {
                if (err) {
                    _data.status = false;
                } else{
                    _data.status = true;
                    _data.message = enumMessage.removeSuccessful;
                }

                data.db.close();

                _this.resource.end(JSON.stringify(_data));
            });
        }
    });
}

module.exports = translateController;