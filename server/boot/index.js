
module.exports = function (app) {
    require("./configuration")(app);
    require("./express")(app);
    //require("./passport")(app);
};