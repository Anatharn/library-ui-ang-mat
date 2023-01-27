import { HALEmbedded } from "./HALEmbedded";
import { HALLinks } from "./HALLinks";
import { HALObject } from "./HALObject";
import { HALPage } from "./HALPage";

export class HALResponse<T extends HALObject> {
    public _embedded!: HALEmbedded<T>;
    public _links!: HALLinks;
    public page!: HALPage;

    constructor() {

    }
}