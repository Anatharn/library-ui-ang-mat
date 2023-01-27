import { HALLinks } from "./HALLinks";

export class HALObject {

    public _links!: HALLinks;

    constructor(){
        this._links = new HALLinks();
    }
}