var util = require('util'),
    exception = require('../../config/exception'),
    message = require('../../config/message'),
    User = require('./user-model');
    baseCtrl = require('../../controller/baseController');

const EventEmitter = require('events');

var userController = function (response) {
    userController.super_.apply(this, arguments);
    this.response = response;
    this.entity = 'user';
    this.emitters(new EventEmitter());
}

util.inherits(userController, baseCtrl);

userController.prototype.emitters = function (instanceEmmiter) {
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

    this.emitter.on('result', function (data) {
        var _data = {};

        _data.status = true;
        _data.body = data.body;
        _data.message = data.message;
        _data.count = data.count;

        _this.response.writeHead(200);
        _this.response.end(JSON.stringify(_data));
    });
}
userController.prototype.index = function () {
    this.resource.writeHead(200);
    // this.resource.end('this is index page');
}

userController.prototype.save = function (json) {
    var _this = this,
        user = new User(json.firstName, json.lastName, json.middleName);

    user.dataCreate = json.dataCreate ? json.dataCreate : null;
    user.dataUpdate = json.dataUpdate ? json.dataUpdate : null;
    user.attachmentId = json.attachmentId ? json.attachmentId : null;

    this.db.save(_this.entity, json, function (data) {
        if (data.error) {
            _this.emitter.emit('error', data);
        } else {
            _this.emitter.emit('result', data);
        }
    });
}

userController.prototype.get = function () {
    var _this = this;

    this.db.get(_this.entity, function (data) {
        if (data.error) {
            _this.emitter.emit('error', data);
        } else {
            _this.emitter.emit('result', data);
        }
    });
}

userController.prototype.getById = function (id) {
    var _this = this;

    this.db.getById(_this.entity, id, function (data) {
        if (data.error) {
            _this.emitter.emit('error', data);
        } else {
            _this.emitter.emit('result', data);
        }
    })
}


userController.prototype.remove = function (json) {
    var _this = this;

    this.db.remove(this.entity, json, function (data) {
        if (!data.status) {
            _this.emitter.emit('error', data);
        } else {
            _this.emitter.emit('result', data);
        }
    });
}

module.exports = userController;