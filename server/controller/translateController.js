var mongoController = require('./mongoController.js'),
    fileOfData = 'data.json',
    enumMessage = require('./../config/message'),
    data = require('./../'+ fileOfData),
    fs = require('fs');

var translateController = function (resource) {
    this.resource = resource;
    this.mongoCtrl = (new mongoController);
    this.fs = fs;
    this.entity = 'translate';
}

translateController.prototype.index = function () {
    this.resource.writeHead(200);
    // this.resource.end('this is index page');
}

translateController.prototype.save = function (json) {
    var _data = {},
        _this = this;

    this.mongoCtrl.connect(function (data) {
        if (!data.status) {
            _this.resource.end(404);
            return;
        }
        var collection = data.db.collection(_this.entity);

        var callback = function (err, result) {
            if (err) {
                _data.status = false;
                delete _data.message;
            } else{
                _data.status = true;
            }

            data.db.close();

            _this.resource.end(JSON.stringify(_data));
        }

        if (json.id) {
            // update
            _data.message = enumMessage.updateSuccessful;
            collection.updateOne( {
                    '_id': json.id
                },
                {
                    $set: json
                },
                true, callback
            );
        } else {
            _data.message = enumMessage.insertSuccessful;
            collection.insertOne(json, callback); //insert
        }
    });
}

translateController.prototype.get = function () {
    var _this = this;

    this.mongoCtrl.connect(function (data) {
        var _data;

        _data = {
            count: 0
        };

        if (!data.status) {
            _this.resource.end(JSON.stringify(data));
            return;
        }
        var collection = data.db.collection(_this.entity);

        collection.find().toArray(function(err, docs) {
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
    });
}

translateController.prototype.getById = function (id) {
    var _this = this;

    this.mongoCtrl.connect(function (data) {
        var _data;

        _data = {
            count: 0
        };

        if (!data.status) {
            _this.resource.end(JSON.stringify(data));
            return;
        }
        var collection = data.db.collection(_this.entity);

        collection.find({
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
    });
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