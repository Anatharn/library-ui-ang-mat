import { HALObject } from "../hal/HALObject";
import { Bookcase } from "./Bookcase";

export class Rack extends HALObject{

    name!: string;
    bookcase!: Bookcase;

    constructor(name: string){
        super();
        this.name = name;
    }
}