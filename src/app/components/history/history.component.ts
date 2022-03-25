import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transference } from 'src/app/models/transference.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  user_id: string = "623c1917b98cd2ec0b9e7fe3"  
  transference_list : Transference[] = [];

  constructor( private user_service: UserService, private transaction_service: TransactionService) { }


  ngOnInit(): void {
    this.loadTransactions()
  }

  loadTransactions(){
    this.transaction_service.getTransactionByUserId(this.user_id).subscribe(
      data =>{        
        if(data.message){
          console.log(data.message)
        }else{          
          const user_transaction_list = data;        
          user_transaction_list.forEach( (item: { id_payer: String; id_receiver: String; amount:number, timestamp: String}) => {
            const transference: Transference = { amount: item.amount.toLocaleString('es-CO'), date: item.timestamp.substring(0,10).replaceAll('-','/')}
            this.user_service.getUserById(item.id_payer).subscribe(
              data =>{
                if(data.message){
                  console.log(data.message)
                }else{
                  transference.payer = data.phone_number;                  
                }
              }, error =>{
                console.log("Error")
                console.log(error);
            });
            this.user_service.getUserById(item.id_receiver).subscribe(
              data =>{
                if(data.message){
                  console.log(data.message)
                }else{
                  transference.receiver = data.phone_number;
                  console.log(transference);
                }
              }, error =>{
                console.log("Error")
                console.log(error);
            });
            this.transference_list.push(transference);
          });
        }        
      },error =>{
        console.log("Error")
        console.log(error);
      }
    );
  }

}
