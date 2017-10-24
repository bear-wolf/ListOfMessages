var userController = require('./userController');

module.exports = function (app) {
    app.get('/users', function (req, res) {
        (new userController(res)).get();
    });
    app.get('/users/:id', function (req, res) {
        (new userController(res)).getById(req.params.id);
    });

    app.post('/users/save', function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        (new userController(res)).save(req.body);
    });
    app.post('/users/remove', function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        (new userController(res)).remove(req.body);
    });
}