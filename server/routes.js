/**
 * Created by andrew on 2/1/17.
 */
var mainController = require('./controller/mainController'),
    translateController = require('./controller/translateController'),
    userController = require('./controller/userController'),
    mongoController = require('./controller/mongoController.js'),
    config = require('./config'),
    bodyParser = require('body-parser');

var route = function () {}
route.prototype.addHeader = function(res) {
    res.setHeader('Access-Control-Allow-Origin', config.urlOfClient); // для кросдоменного звязку // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type'); // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Credentials', true);
}
route.prototype.isAuth = function () {

},
route.prototype.init = function () {
    var mongoCtrl,
        object = this;

    mongoCtrl = new mongoController(config);

    var urlencodedParser = bodyParser.urlencoded({ extended: true })
    var jsonParser = bodyParser.json();

    object.app.use(function (req, res, next) {
        object.addHeader(res);

        if (req.method == 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Headers', ''); // Request methods you wish to allow
            res.statusCode = 200;
            res.end('');
        } else next();
    });

    // GET method route
    object.app.get('/', function (req, res) {
        res.send('GET request to the homepage, hello');
        res.end('');
    });

    object.app.get('/install', function (req, res) {
        mongoCtrl.setParams({
            response: res
        }).install();
    });


    /*translate*/
    object.app.get('/translate', function (req, res) {
        (new translateController(res)).get();
    });

    object.app.get('/translate/get/:id', function (req, res) {
        (new translateController(res)).getById(req.params.id);
    });

    object.app.post('/translate/save', urlencodedParser, function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        (new translateController(res)).save(req.body);
    });
    object.app.post('/translate/remove', urlencodedParser, function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        (new translateController(res)).remove(req.body);
    });
    //=====================

    /*users*/
    object.app.get('/users', function (req, res) {
        (new userController(res)).get();
    });
    object.app.get('/users/get/:id', function (req, res) {
        (new userController(res)).getById(req.params.id);
    });

    object.app.post('/users/save', urlencodedParser, function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        (new userController(res)).save(req.body);
    });
    object.app.post('/users/remove', urlencodedParser, function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        (new userController(res)).remove(req.body);
    });
    //====================

    // object.app.get('/login', function (req, res, next) {
    //     if (req.query.email && req.query.password) {
    //         (new mainController(res)).getCredentials(req.query);
    //     }
    //     next();
    // });
    // object.app.post('/logout', function (req, res) {
    //     var data, index=-1;
    //
    //     data = {
    //         status: false
    //     }
    //
    //     if (process.token) {
    //         index = process.token.indexOf(req.body.token)
    //         if (index>=0) {
    //             process.token.splice(index,1) // remove;
    //             data.status = true;
    //         }
    //     }
    //
    //     res.statusCode = 200;
    //     res.end(JSON.stringify(data));
    // });
    // object.app.post('/isAuth', function (req, res, next) {
    //     var index, data;
    //
    //     data = {
    //         status: false
    //     }
    //
    //     if (process.token) {
    //         index = process.token.indexOf(req.body.token)
    //         if (index>=0) {
    //             data.status = true;
    //         }
    //     }
    //
    //     res.statusCode = 200;
    //     res.end(JSON.stringify(data));
    // });


    // object.app.get('/users', function (req, res) {
    //     (new mainController(res)).get();
    // });
    // object.app.all('/users/:id', function (req, res, next) {
    //     switch (req.method) {
    //         case 'PUT':
    //         case 'POST': {
    //             (new mainController(res)).save(req.body);
    //             break;
    //         }
    //         case 'GET': {
    //             (new mainController(res)).getById(req.url.substring(req.url.lastIndexOf('/')+1));
    //             break;
    //         }
    //         case 'DELETE': {
    //             (new mainController(res)).removeById(req.url.substring(req.url.lastIndexOf('/')+1));
    //             break
    //         }
    //         default: {
    //             next(); // pass control to the next handler
    //             break;
    //         }
    //     }
    // });
    //
    // object.app.post('/users', function (req, res) {
    //     (new mainController(res)).save(req.body);
    // });



    this.app.use(function (req, res) {
        res.statusCode = 404;
        res.end('Page no found');
    });

    this.app.use(function(err, req, res, next) {
        if (err) {
            res.statusCode = 500;
            console.error(err.stack);
            res.send('Something broke!');
        }
    });
}


module.exports = route;