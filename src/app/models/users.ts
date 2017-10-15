/**
 * Created by admin on 24.09.2017.
 */

import * as moment from 'moment'; // add this 1 of 4

export class Participant {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    dataCreate: number;
    dataUpdate: number;
    attachmentId: number;

    constructor(firstName, lastName, middleName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;

        this.dataCreate = Number(moment.unix);
    }
}