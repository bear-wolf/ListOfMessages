var MongoClient = require('mongodb').MongoClient,
    config = require('./../config'),
    _ = require('underscore');
    Server = require('mongodb').Server;

var mongoController = function () {
    this.client = MongoClient;
    this.config = config;

    this.tables = ['translate', 'attachment', 'user', 'message'];
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

mongoController.prototype.connect = function (callback) {
    this.client.connect('mongodb://localhost:' + this.config.portDb +'/'+ this.config.db, function(err,database) {
        if(err) {
            console.error(err)
        } else {
            if (_.isFunction(callback)) {
                callback(database);
            }
        }
    })
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


module.exports = mongoController;