export class Transaction{
    id?: string;
    type?: string;
    id_card?: string;
    id_payer: string;    
    id_receiver:string;
    amount: number

    constructor(type:string, id_payer:string ,id_receiver:string, amount:number,id_card:string){
        this.type = type;
        this.id_payer = id_payer;
        this.id_receiver = id_receiver;
        this.amount = amount
    }
}