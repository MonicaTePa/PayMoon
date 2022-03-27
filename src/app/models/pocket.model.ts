export class Pocket{
    _id?: string;
    id_user: string;
    balance?: number;
    receptions?: number;
    payments?: number;
    deposits?: number;
    former_balance?: number;  
    last_deposit?: number;  

    constructor(id_user: string, balance?: number, receptions?:number, payments?:number,deposits?:number, former_balance?: number, last_deposit?: number){
        this.id_user = id_user;
        this.balance = balance;
        this.receptions = receptions;
        this.payments = payments;
        this.deposits = deposits;
        this.former_balance = former_balance? former_balance: 0;
        this.last_deposit = last_deposit? last_deposit: 0;        
    }
}

