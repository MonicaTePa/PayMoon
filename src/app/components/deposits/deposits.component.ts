import { Component, OnInit } from '@angular/core';
import { Deposit } from 'src/app/models/deposit.model';
import { DepositsService } from 'src/app/services/deposits.service';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';
import { Pocket } from 'src/app/models/pocket.model';
import { PocketService } from 'src/app/services/pocket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {

  user_id: string = "623c1917b98cd2ec0b9e7fe3"
  card_list: Card[] | null = null
  pocket_former_balence: number = 0;
  latest_deposite: number = 0;

  depositRegisterForm: FormGroup;

  numbersRegex = /^[0-9]+$/;  
  
  constructor( private fb: FormBuilder, private card_service: CardService, private deposit_service: DepositsService, private pocket_service: PocketService) {
    this.depositRegisterForm = fb.group({
      id_card: [[Validators.required]],
      amount: ['',[Validators.required,Validators.pattern(this.numbersRegex)]]
    })
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

  pocketDeposit(){
    console.log (typeof(this.depositRegisterForm.get('amount')?.value))
    
    const deposit: Deposit = {
      id_user: this.user_id,      
      id_card: this.depositRegisterForm.get('id_card')?.value,
      amount: parseInt(this.depositRegisterForm.get('amount')?.value),
      type: "CARD"
    }
    console.log(deposit)  
    this.pocket_service.getPocketById(this.user_id).subscribe(
      data =>{        
        const pocket = data;
        console.log(pocket);        
          const newPocket: Pocket = {
            id_user: this.user_id,
            balance: pocket?.balance?pocket?.balance + deposit.amount: deposit.amount,
            receptions:pocket?.receptions,
            payments:pocket?.payments,
            deposits:pocket?.deposits?pocket?.deposits + deposit.amount: deposit.amount
          }
          this.pocket_service.putPocket(pocket._id,newPocket).subscribe(
            data =>{
              console.log("Bolsillo actualizado");
              this.deposit_service.postDeposit(deposit).subscribe(
                data => {
                  console.log("deposito creado");
                  console.log(data)
                }, error =>{
                  console.log("Hubo un error");
                  console.log(data)
                }
              );
            },error => {
              console.log(error)
              console.log("Hubo un err")
            }
            
          );
         console.log(newPocket);      
        },
      error =>{
        console.log("Hubo un error")
        console.log(error);      
      }
    );    
  }



}
