import { HALLink } from "./HALLink";

export class HALLinks {

    public self!: HALLink;
    public profile!: HALLink;
    [key: string]: HALLink;

}