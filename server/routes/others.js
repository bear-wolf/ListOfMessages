
module.exports = function (app) {

    // GET method route
    app.get('/', function (req, res) {
        res.send('GET request to the homepage, hello');
        res.end('');
    });

    app.use(function (req, res) {
        res.statusCode = 404;
        res.end('Page no found');
    });

    app.use(function (err, req, res, next) {
        if (err) {
            res.statusCode = 500;
            console.error(err.stack);
            res.send('Something broke!');
        }
    });
}