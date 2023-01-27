export class HALPage {
    
    public size: number;
    public totalElements!: number;
    public totalPages!: number;
    public number: number;

    constructor(number: number, size: number){
        this.number = number;
        this.size = size;
    }
}