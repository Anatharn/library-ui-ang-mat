import { HALObject } from "../hal/HALObject";
import { Rack } from "./Rack";


export class Bookcase extends HALObject {

    name!: string;
    capacity!: number;
    rackList!:Rack[];
}