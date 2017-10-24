var util = require('util'),
    exception = require('../../config/exception'),
    message = require('../../config/message'),
    Translate = require('./translate-model'),
    baseCtrl = require('../../controller/baseController');

const EventEmitter = require('events');

var translateController = function (response) {
    translateController.super_.apply(this, arguments);
    this.response = response;
    this.entity = 'translate';
    this.emitters(new EventEmitter());
}

util.inherits(translateController, baseCtrl);

translateController.prototype.index = function () {
    this.response.writeHead(200);
    // this.resource.end('this is index page');
}

translateController.prototype.emitters = function (instanceEmmiter) {
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

translateController.prototype.save = function (json) {
    var _this = this,
        translate = new Translate(json.key, json.value);

    translate.dataCreate = json.dataCreate ? json.dataCreate : null;
    translate.dataUpdate = json.dataUpdate ? json.dataUpdate : null;
    translate._id = json.id ? json.id : null;

    this.db.save(_this.entity, translate, function (data) {
        if (data.error) {
            _this.emitter.emit('error', data);
        } else {
            _this.emitter.emit('result', data);
        }
    });
}

translateController.prototype.getToPipe = function () {
    var _this = this;

    this.db.get(_this.entity, function (data) {
        if (data.error) {
            _this.emitter.emit('error', data);
        } else {
            var o = {}

            data.body.forEach(function callback(data, index, array) {
                o[data.key] = data.value;
            });
            data.body = o;
            _this.emitter.emit('result', data);
        }
    });
}

translateController.prototype.get = function () {
    var _this = this;

    this.db.get(_this.entity, function (data) {
        if (data.error) {
            _this.emitter.emit('error', data);
        } else {
            _this.emitter.emit('result', data);
        }
    });
}

translateController.prototype.getById = function (id) {
    var _this = this;

    this.db.getById(_this.entity, id, function (data) {
        if (data.error) {
            _this.emitter.emit('error', data);
        } else {
            _this.emitter.emit('result', data);
        }
    })
}


translateController.prototype.remove = function (json) {
    var _this = this;

    this.db.remove(this.entity, json, function (data) {
        if (!data.status) {
            _this.emitter.emit('error', data);
        } else {
            _this.emitter.emit('result', data);
        }
    });
}

module.exports = translateController;