/**
 * Created by andrew on 10/24/17.
 */

var dt = require('date-and-time');

//this.id;
// this.firstName: string;
// this.lastName: string;
// this.middleName: string;
// this.dataCreate: number;
// this.dataUpdate: number;
// this.attachmentId: number;

var User = function (firstName, lastName, middleName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
}

module.exports = User;