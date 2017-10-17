/**
 * Created by andrew on 2/2/17.
 */

var fileOfData = 'data.json',
    data = require('./../'+ fileOfData),
    crypto = require('crypto'),
    fs = require('fs');

var mainController = function (resource, db) {
    this.resource = resource;
    this.db = db;
    this.fs = fs;
}

mainController.prototype.index = function () {
    this.resource.writeHead(200);
    this.resource.end('this is index page');
}
// mainController.prototype.getCredentials = function (data) {
//
//     this.db(data, function (data) {
//         if (!data.length) {
//             throw new Error('error');
//         }
//         return data;
//     })
// }

mainController.prototype.install = function () {
    var data = {},
        object = this,
        tables = ['translate', 'attachment', 'user', 'message'];

    db.listCollections().toArray(function(err, collections){
        if (err) {
            data.status = false;
            object.resource.writeHead(404);
            object.resource.end(JSON.stringify(data));
        }

        if (collections.length) {
            data.status = false;
            data.message = 'The tables there is in base data';
        } else {
            data.status = true;

            for (var i=0; i<=tables.length; i++) {
                object.db.createCollection(tables[i]);
            }
            data.messagge= 'Create is '+ tables.length +' tables';
        }

        object.resource.writeHead(200);
        object.resource.end(JSON.stringify(data));
    });


}
mainController.prototype.get = function () {
    var data,
        object = this,
        list = [],
        arrLength = this.db.user.length,
        users = this.db.user;

    for (var key = 0; key < arrLength; key++) {
        if (!users[key].status) {
            list.push(users[key]);
        }
    }

    data = {
        body : list,
        status: true
    }
    object.resource.writeHead(200);
    object.resource.end(JSON.stringify(data));
}

// mainController.prototype.getCredentials = function (data) {
//     var object = this,
//         user = null,
//         headerResponse = {
//             'Content-Type': 'application/json'
//         },
//         arrLength = this.db.user.length,
//         users = this.db.user;
//
//     for (var key = 0; key < arrLength; key++) {
//         if (users[key].email == data.email && users[key].password == data.password && users[key].status ==1) {
//             user = users[key];
//             break;
//         }
//     }
//
//     if (user) {
//         var token = crypto.randomBytes(256).toString('hex') // Synchronous
//
//         if (!process.token) {
//             process.token = [];
//             process.token.push(token);
//         }
//
//         data = {
//             token : token,
//             body : user,
//             status: true
//         }
//         object.resource.writeHead(200, headerResponse);
//         object.resource.end(JSON.stringify(data));
//     } else {
//         object.resource.writeHead(401, headerResponse);
//         object.resource.end(JSON.stringify({
//             status: false,
//             message: 'User is not administrator'
//         }));
//     }
//     return user;
// }
//
// mainController.prototype.getById = function (id){
//     var data,
//         object = this,
//         list = [],
//         arrLength = this.db.user.length,
//         users = this.db.user;
//
//     for (var key = 0; key < arrLength; key++) {
//         if (!users[key].status && users[key].id == id) {
//             list.push(users[key]);
//             break;
//         }
//     }
//
//     data = {
//         body : list[0],
//         status: true
//     }
//     object.resource.writeHead(200);
//     object.resource.end(JSON.stringify(data));
// }

mainController.prototype.save = function (data) {
    var json,
        object = this,
        listOfUsers = this.db.user,
        arrLength = listOfUsers.length;

    if (!data.id) {
        //save
        data.id = listOfUsers.length+1;
        listOfUsers.push(data);
    } else {
        //update
        for (var key = 0; key < arrLength; key++) {
            if (listOfUsers[key].id == data.id) {
                listOfUsers[key] = data;
                break;
            }
        }
    }

    json = JSON.stringify(this.db);
    this.fs.writeFile(fileOfData, json, 'utf8', function (data) {
        var _data = {
            status: true
        }
        object.resource.writeHead(200);
        object.resource.end(JSON.stringify(_data));
    });
}

module.exports = mainController;