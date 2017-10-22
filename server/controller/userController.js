var util = require('util'),
    baseCtrl = require('./baseController');

var userController = function (resource) {
    userController.super_.apply(this, arguments);
    this.resource = resource;
    this.entity = 'user';
}

util.inherits(userController, baseCtrl);

userController.prototype.index = function () {
    this.resource.writeHead(200);
    // this.resource.end('this is index page');
}

userController.prototype.save = function (json) {
    var _this = this;

    this.db.save(_this.entity, json, function (data) {
        var _data = {
            message : data.message
        };

        if (data.error) {
            _data.status = false;

        } else {
            _data.status = true;
        }
        _this.resource.end(JSON.stringify(_data));
    });
}

userController.prototype.get = function () {
    var _this = this;

    this.db.get(_this.entity, function (data) {
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

userController.prototype.getById = function (id) {
    var _this = this;

    this.db.getById(_this.entity, id, function (data) {
        var _data = {};

        if (!data.status) {
            _data.status = false;
        } else {
            _data.status = true;
            _data.body = data.body;
            _data.count = data.count;
        }

        _this.resource.end(JSON.stringify(_data));
    })
}


userController.prototype.remove = function (json) {
    var _this = this;

    this.db.remove(this.entity, json, function (data) {
        if (!data.status) {
            _this.resource.end(data);
        } else {
            _this.resource.end(JSON.stringify(data));
        }
    });
}

module.exports = userController;