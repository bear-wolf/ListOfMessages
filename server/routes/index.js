/**
 * Created by andrew on 2/1/17.
 */
var nconf = require('nconf');

module.exports = function (app) {
    require("./../module/translate/translate-routes")(app);
    require("./../module/user/user-routes")(app);
    require("./../module/mongoDB/mongo-routes")(app);

    new route(app);
};

var route = function (app) {
    this.init(app)
}
route.prototype.addHeader = function(res) {
    res.setHeader('Access-Control-Allow-Origin', nconf.get('urlOfClient')); // для кросдоменного звязку // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type'); // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Credentials', true);
}
route.prototype.init = function (app) {
    var object = this;

    app.use(function (req, res, next) {
        object.addHeader(res);

        if (req.method == 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Headers', ''); // Request methods you wish to allow
            res.statusCode = 200;
            res.end('');
        } else next();
    });

    // GET method route
    app.get('/', function (req, res) {
        res.send('GET request to the homepage, hello');
        res.end('');
    });

    app.use(function (req, res) {
        res.statusCode = 404;
        res.end('Page no found');
    });

    app.use(function(err, req, res, next) {
        if (err) {
            res.statusCode = 500;
            console.error(err.stack);
            res.send('Something broke!');
        }
    });
}