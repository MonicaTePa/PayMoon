export class Pocket{
    _id?: string;
    id_user: string;
    balance?: number;
    receptions?: number;
    payments?: number;
    deposits?: number;    

    constructor(id_user: string, balance?: number, receptions?:number, payments?:number,deposits?:number){
        this.id_user = id_user;
        this.balance = balance;
        this.receptions = receptions;
        this.payments = payments;
        this.deposits = deposits;
    }
}

