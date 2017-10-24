/**
 * Created by andrew on 2/1/17.
 */
var route,
    nconf = require('nconf');

module.exports = function (app) {
    var _route = new route(app);

    require("./../module/translate/translate-routes")(app);
    require("./../module/user/user-routes")(app);
    require("./../module/mongoDB/mongo-routes")(app);
    require("./others")(app);
};

route = function (app) {
    var _this = this;

    app.use(function (req, res, next) {
        _this.addHeader(res);

        if (req.method == 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Headers', ''); // Request methods you wish to allow
            res.statusCode = 200;
            res.end('');
        } else next();
    });
}

route.prototype.addHeader = function(res) {
    res.setHeader('Access-Control-Allow-Origin', nconf.get('urlOfClient')); // для кросдоменного звязку // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type'); // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Credentials', true);
}