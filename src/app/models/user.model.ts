export class User {
    _id?: any;
    full_name: String;
    birth_date: Date;
    identification: String;
    id_date: Date;
    phone_number: String;
    email: String;
    password: String;

    constructor(full_name: String, birth_date: Date, identification: String, id_date:Date,phone_number: String, email: String, password: String){
        this.full_name = full_name;
        this.birth_date = birth_date;
        this.identification = identification;
        this.id_date = id_date;
        this.phone_number = phone_number;
        this.email = email;
        this.password = password
    }
}