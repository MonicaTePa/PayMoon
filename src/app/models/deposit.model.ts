import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

export class Deposit {
    _id?: string;
    id_user: string;
    type?: string;
    id_card: string;
    amount: number;    

    constructor(id_user:string, id_card: string, amount: number, type?: string){
        this.id_user = id_user;    
        this.id_card = id_card;
        this.amount = amount;       
    }
}