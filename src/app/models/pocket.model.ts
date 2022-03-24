export class Pocket{
    id_user: String;
    balance?: Number;
    receptions?: Number;
    payments?: Number;
    deposits?: Number;    

    constructor(id_user: String, balance?: Number, receptions?:Number, payments?:number,deposits?:Number){
        this.id_user = id_user;
        this.balance = balance;
        this.receptions = receptions;
        this.payments = payments;
        this.deposits = deposits;
    }
}

