import { BaseDTO } from "./BaseDTO";

export class ClientNoteDTO extends BaseDTO {
    clientNoteId: string;
    clientId: string;
    createDate: string;
    updateDate: string;
    note: string;

    constructor() {
        super();
        this.clientNoteId = "";
        this.clientId = "";
        this.createDate = "";
        this.updateDate = "";
        this.note = "";

    }
}