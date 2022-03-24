export class Card {
    _id?: String;
    id_user: String;
    card_number: String;
    card_type: String;
    expiration_date: Date;
    cvc: String;
    country: String;
    postal_code: String;
    card_name: String

    constructor(id_user: String, card_number: String, card_type: String, expiration_date: Date, cvc: String, country: String, postal_code: String, card_name: String ){
        this.id_user = id_user;
        this.card_number = card_number;
        this.card_type = card_type;
        this.expiration_date = expiration_date;
        this.cvc = cvc;
        this.country = country;
        this.postal_code = postal_code;
        this.card_name = card_name;
    }
}