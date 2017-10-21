var mongoController = require('./mongoController.js'),
    enumMessage = require('./../config/message'),
    _ = require('underscore');

var baseController = function () {
    this.mongoCtrl = (new mongoController);
}

baseController.prototype.connectToDB = function (entity, callback) {
    this.mongoCtrl.connect(function (data) {
        if (data.status) {
            data.collection = data.db.collection(entity);
        }

        if (_.isFunction(callback)) {
            callback(data);
            return;
        }
        throw new Error('This is does not callback');
    });
}

baseController.prototype.getFromDB = function (entity, callback) {
    this.connectToDB(entity, function (data) {
        var _data = {};

        if (!data.status) {
            _data.status = false;
            callback(data);
            return;
        }
        data.collection.find().toArray(function(err, docs) {
            data.error = err;
            data.body = docs;
            data.count = docs.length;

            if (_.isFunction(callback)) {
                callback(data)
            }
        });

    })
}

baseController.prototype.saveToDB = function (entity, json, callback) {
    this.connectToDB(entity, function (data) {
        var _data = {};

        if (!data.status) {
            _data.status = false;
            callback(data);
            return;
        }

        var _callback = function (err, result) {
            data.db.close();
            data.error = err;
            data.result = result;

            if (_.isFunction(callback)) {
                callback(data)
            }
        }

        if (json.id) {
            // update
            _data.message = enumMessage.updateSuccessful;
            data.collection.updateOne( {
                    '_id': new _this.mongoCtrl.mongodb.ObjectID(json.id)
                },
                {
                    $set: json
                },
                true, _callback
            );
        } else {
            _data.message = enumMessage.insertSuccessful;
            data.collection.insertOne(json, _callback); //insert
        }

    })
}

module.exports = baseController;