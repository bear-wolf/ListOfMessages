var MongoClient = require('mongodb').MongoClient,
    nconf = require('nconf'),
    exception = require('./../../config/exception'),
    enumMessage = require('./../../config/message'),
    _ = require('underscore'),
    mongodb = require('mongodb'),
    Server = require('mongodb').Server;

const EventEmitter = require('events');


var mongoController = function (res) {
    this.client = MongoClient;
    this.exception = exception;
    this.tables = ['translate', 'attachment', 'user', 'message'];
    this.mongodb = mongodb;
    this.dbConnectionString = 'mongodb://localhost:' + nconf.get('portDb') +'/'+ nconf.get('db');
    this.response = res ? res : null;

    this.emitters(new EventEmitter());
};

mongoController.prototype.emitters = function (instanceEmmiter) {
    this.emitter = instanceEmmiter;

    var _this = this;

    this.emitter.on('serverNotRun', function (data) {
        data.status = false;
        data.message = exception.serverNotRun;
    });
    this.emitter.on('error', function (data) {
        data.status = false;
        _this.response.writeHead(500);
        _this.response.end(JSON.stringify(data));
    });
}
mongoController.prototype.install = function () {
    var _this = this;

    this.emitter.on('dataBaseIsCreated', function (data) {
        if (data.status) {
            _this.createTables(data.db);
        } else {
            _this.response.writeHead(200);
            _this.response.end(JSON.stringify(data));
        }
    });

    this.emitter.on('tablesIsCreated', function (data) {
        data.message = enumMessage.tablesIsCreated;
        _this.response.writeHead(200);
        _this.response.end(JSON.stringify(data));
    });

    this.createDataBase();
}

mongoController.prototype.createDataBase = function () {
    var _this = this;

    this.client.connect(this.dbConnectionString, function(err, database) {
        var data = {};

        if(err) {
            _this.emitter.emit('serverNotRun', err);
        } else {
            data.status = true;
            data.db = database;
            _this.emitter.emit('dataBaseIsCreated', data);
        }
    })
}

mongoController.prototype.createTables = function (db) {
    var _this = this;

    db.listCollections().toArray(function(err, collections){
        var data = {};

        if (err) {
            _this.emitter.emit('error', err);
        } else {
            if (collections.length) {
                data.status = false;
                data.message = enumMessage;
                _this.emitter.emit('error', data);
            } else {
                data.status = true;
                for (var i=0; i<=_this.tables.length; i++) {
                    db.createCollection(_this.tables[i]); // TODO: not working
                }
                _this.emitter.emit('tablesIsCreated', data);
            }
        }
        return;
    });
}

mongoController.prototype.connectToDB = function (entity, callback) {
    this.client.connect(this.dbConnectionString, function(err,database) {
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

mongoController.prototype.objectNotNull = function (json) {
    var object = {};
    for (key in json) {
        if (json[key] != null) {
            object[key] = json[key];
        }
    }
    return object;
};

mongoController.prototype.save = function (entity, json, callback) {
    var _this = this;

    json = this.objectNotNull(json);

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