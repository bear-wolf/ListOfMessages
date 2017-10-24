var nconf = require("nconf"),
    express = require('express'),
    //passport = require('passport'),
    path = require('path');
    //flash = require('connect-flash');

module.exports = function (app) {

    app.set('port', nconf.get("app:port") || 3001);
    app.set('views', path.join(__dirname + "/..", 'views'));
    app.set('view engine', 'jade');

    var sessionOptions = nconf.get("session");

    // if ('production' == app.get('env')) {
    //     var MemcachedStore = require('connect-memcached')(express);
    //     sessionOptions.store = new MemcachedStore(
    //         nconf.get("memcached")
    //     );
    // }

    //if behind a reverse proxy such as Varnish or Nginx
    //app.enable('trust proxy');
    //app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    // app.use(express.methodOverride());
    // app.use(express.cookieParser());
    // app.use(express.session(sessionOptions));
    //app.use(flash()); for save messages

    // app.use(passport.initialize());
    // app.use(passport.session());

    //app.use(app.router);

    // if ('development' == app.get('env')) {
    //     app.use(express.errorHandler());
    // }
};