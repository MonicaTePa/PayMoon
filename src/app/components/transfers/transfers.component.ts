import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction} from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {

  user_id: string = "623c1917b98cd2ec0b9e7fe3" 

  //Cadena de prueba
  // user_id: string = "623cbaf06fc9b149e5c47725" 

  card_list: Card[] | null = null
  pocket_former_balence: number = 0;
  latest_deposite: number = 0;

  transferRegisterForm: FormGroup;

  numbersRegex = /^[0-9]+$/;  
  
  constructor(private fb: FormBuilder, private user_service: UserService, private transaction_service: TransactionService, private card_service: CardService) { 
    this.transferRegisterForm = this.fb.group({
      id_card: [[Validators.required]],
      receiver_phone: ['',[Validators.required, Validators.pattern(this.numbersRegex)]],
      amount: ['',[Validators.required, Validators.pattern(this.numbersRegex)]]
    });
  }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(){
    this.card_service.getCardsByUserId(this.user_id).subscribe(
      data =>{        
        this.card_list =  data;
      },error =>{
        console.log("Error")
        console.log(error);
      }
    );
  }

  makeTransfer(){
    const phone_number = this.transferRegisterForm.get('receiver_phone')?.value
    const transfer_amount = this.transferRegisterForm.get('amount')?.value
    const id_card = this.transferRegisterForm.get('id_card')?.value

    

    this.user_service.getUserByPhone(phone_number).subscribe(
      data =>{
        if(data.message){
          console.log(data.message);
        }else{
          console.log(data);
          const id_receiver = data;          
          const transaction : Transaction = {            
            id_payer: this.user_id,
            id_receiver: id_receiver,
            amount: transfer_amount,
            type: id_card == "none"?"Bolsillo":"Tarjeta",
            id_card: id_card == "none"?"No aplica":id_card
          }
          this.transaction_service.postTransaction(transaction).subscribe(
            data =>{
              console.log(data.message);
            },error =>{
              console.log("Hubo un error");
              console.log(error);
            }
          );
        }
      },error =>{
        console.log(error);
        console.log("Hubo un error");
      }
    );

   
  
  }

}
