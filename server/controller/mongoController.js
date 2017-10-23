var MongoClient = require('mongodb').MongoClient,
    nconf = require('nconf'),
    exception = require('./../config/exception'),
    enumMessage = require('./../config/message'),
    _ = require('underscore'),
    mongodb = require('mongodb'),
    Server = require('mongodb').Server;


var mongoController = function () {
    this.client = MongoClient;
    this.exception = exception;
    this.tables = ['translate', 'attachment', 'user', 'message'];
    this.mongodb = mongodb;
};

mongoController.prototype.setParams = function (data) {
    this.response = data.response;
    return this;
}
mongoController.prototype.install = function () {
    var data = {
            status: false
        };

    if (this.createDataBase()) {
        data = this.createTables();
    }

    this.response.writeHead(200);
    this.response.end(JSON.stringify(data));
}

mongoController.prototype.createDataBase = function () {
    return this.connect() ? true : false;
}

mongoController.prototype.createTables = function () {
    var data = {},
        object = this;

    this.db.listCollections().toArray(function(err, collections){
        if (err) {
            data.status = false;
            object.resource.writeHead(404);
            object.resource.end(JSON.stringify(data));
        }

        if (collections.length) {
            data.status = false;
            data.message = 'The tables there is in base data';
        } else {
            data.status = true;
            for (var i=0; i<=object.tables.length; i++) {
                object.db.createCollection(object.tables[i]);
            }
        }

        return data;
    });
}

mongoController.prototype.connectToDB = function (entity, callback) {
    this.client.connect('mongodb://localhost:' + nconf.get('portDb') +'/'+ nconf.get('db'), function(err,database) {
        var data = {};

        if(err) {
            data.status = false;
            data.message = exception.serverNotRun;
        } else {
            data.status = true;
            data.db = database;
            data.collection = data.db.collection(entity);
        }

        if (_.isFunction(callback)) {
            callback(data);
            return;
        }
        throw new Error('This is does not callback');
    })
}

mongoController.prototype.get = function (entity, callback) {
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

mongoController.prototype.save = function (entity, json, callback) {
    var _this = this;

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
            data.message = enumMessage.updateSuccessful;
            data.collection.updateOne( {
                    '_id': new _this.mongodb.ObjectID(json.id)
                },
                {
                    $set: json
                },
                true, _callback
            );
        } else {
            data.message = enumMessage.insertSuccessful;
            data.collection.insertOne(json, _callback); //insert
        }

    })
}

mongoController.prototype.remove = function (entity, json, callback) {
    var _this = this;

    this.connectToDB(entity, function (data) {
        var _data = {};

        if (!data.status) {
            _data.status = false;
            callback(data);
        }
        else {
            data.collection.deleteOne({
                    _id: new _this.mongodb.ObjectID(json.id)
                },
                function (err, result) {
                    if (err) {
                        _data.status = false;
                    } else{
                        _data.status = true;
                        _data.message = enumMessage.removeSuccessful;
                    }

                    if (_.isFunction(callback)) {
                        callback(_data);
                    }
                });
        }


    })
}

mongoController.prototype.getById = function (entity, id, callback) {
    var _this = this;

    this.connectToDB(entity, function (data) {
        var _data = {};

        if (!data.status) {
            _data.status = false;
            callback(data);
            return;
        }
        data.collection.find({
            '_id': new _this.mongodb.ObjectID(id)
        }).toArray(function(err, docs) {
            data.error = err;
            data.body = docs;
            data.count = docs.length;

            if (_.isFunction(callback)) {
                callback(data)
            }
        });
    })

}

module.exports = mongoController;