/**
 * Created by admin on 24.09.2017.
 */

export class Attachment {
    id: number;
    name: string;
    link: string; // link to file
    dataCreate: number;
    dataUpdate: number;

    constructor(name, link) {
        this.name = name;
        this.link = link;
    }
}