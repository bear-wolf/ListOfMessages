/**
 * Created by admin on 24.09.2017.
 */

export class Message {
    id: number;
    name: string;
    description: string;
    participantId: number;
    dataCreate: number;
    dataUpdate: number;
    attachmentId: number;

    constructor(name, participantId) {
        this.name = name;
        this.participantId = participantId;
    }
}