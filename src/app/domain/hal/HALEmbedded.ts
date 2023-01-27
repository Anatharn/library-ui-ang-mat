import { HALObject } from "./HALObject";

export class HALEmbedded<T extends HALObject> {

    [key: string]:T[];
}