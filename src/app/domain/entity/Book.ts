import { HALObject } from "../hal/HALObject";
import { Author } from "./Author";
import { Rack } from "./Rack";

export class Book extends HALObject{

    constructor(public title: string, public isbn: string, public authorList: Author[], public rack: Rack ){
        super();
    }
}