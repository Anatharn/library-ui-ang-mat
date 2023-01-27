import { HALObject } from "../hal/HALObject";

export class Author extends HALObject{
    
    public firstName: string;
    public lastName: string;

    constructor(firstName: string, lastName: string){
        super();
        this.firstName = firstName;
        this.lastName = lastName;
    };
}