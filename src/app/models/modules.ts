/**
 * Created by admin on 23.09.2017.
 */

export class Modules {
    id: number;
    name: string;
    url: string;

    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}