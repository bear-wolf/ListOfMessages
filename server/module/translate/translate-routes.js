var translateController = require('./translateController');

module.exports = function (app) {
    /*translate*/
    app.get('/translate', function (req, res) {
        (new translateController(res)).get();
    });

    app.get('/translate/all', function (req, res) {
        (new translateController(res)).getToPipe();
    });

    app.post('/translate/save', function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        (new translateController(res)).save(req.body);
    });
    app.post('/translate/remove', function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        (new translateController(res)).remove(req.body);
    });

    app.get('/translate/:id', function (req, res) {
        (new translateController(res)).getById(req.params.id);
    });
    //=====================
}