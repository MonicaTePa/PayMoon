import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction} from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';
import { Pocket } from 'src/app/models/pocket.model';
import { PocketService } from 'src/app/services/pocket.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {

  //user_id: string = "623c1917b98cd2ec0b9e7fe3" 
  user_id: string = new GlobalConstants().getUserId();

  //Cadena de prueba
  // user_id: string = "623cbaf06fc9b149e5c47725" 

  card_list: Card[] | null = null

  transferRegisterForm: FormGroup;

  numbersRegex = /^[0-9]+$/;  
  
  constructor(private fb: FormBuilder, private user_service: UserService, private transaction_service: TransactionService, private card_service: CardService, private pocket_service: PocketService) { 
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
    const transfer_amount = parseInt(this.transferRegisterForm.get('amount')?.value);
    const id_card = this.transferRegisterForm.get('id_card')?.value       

    this.user_service.getUserByPhone(phone_number).subscribe(
      data =>{
        if(data.message){
          //console.log(data.message);
          Swal.fire({            
            text: 'El número ingresado no coincide con el de algún usuario PAYMOON ',                           
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
          }});
        }else{          
          //console.log(data);
          const id_receiver = data;         
          const transaction : Transaction = {            
            id_payer: this.user_id,
            id_receiver: id_receiver,
            amount: transfer_amount?transfer_amount:0,
            type: id_card === "none"?"BOLSILLO":"TARJETA",
            id_card: id_card === "none"?"NO APLICA":id_card
          }  
          
          this.pocket_service.getPocketById(transaction.id_payer).subscribe(
            data =>{
              let payer_pocket = data;
              if((payer_pocket.balance < transaction.amount) && transaction.type === "BOLSILLO"){
                Swal.fire({                 
                  text: 'Su bolsillo no tiene saldo suficiente para esta transferencia',                                
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }}); 
              }else{
                this.pocket_service.getPocketById(transaction.id_receiver).subscribe(
                  data =>{
                    let receiver_pocket = data;
                    //console.log(receiver_pocket);


                    //console.log(payer_pocket);
                    payer_pocket.former_balance = payer_pocket.balance;
                    payer_pocket.balance = (transaction.type === "BOLSILLO")?(payer_pocket.balance - transaction.amount): payer_pocket.balance
                    payer_pocket.payments = (transaction.type === "BOLSILLO")?(payer_pocket.payments + transaction.amount): payer_pocket.payments
                    //console.log(payer_pocket);

                    // console.log(receiver_pocket);
                    receiver_pocket.former_balance = receiver_pocket.balance;
                    receiver_pocket.balance  = receiver_pocket.balance + transaction.amount;
                    receiver_pocket.receptions = receiver_pocket.receptions + transaction.amount;
                    // console.log(receiver_pocket);

                    this.transaction_service.postTransaction(transaction).subscribe(
                      data =>{
                        const id_transaction = data.id
                        this.pocket_service.putPocket(receiver_pocket._id, receiver_pocket).subscribe(
                          data =>{
                            this.pocket_service.putPocket(payer_pocket._id,payer_pocket).subscribe(
                              data =>{
                                Swal.fire({
                                  title: 'Transferencia existosa',                             
                                  icon: 'success',             
                                  showClass: {
                                    popup: 'animate__animated animate__fadeInDown'
                                  },
                                  hideClass: {
                                    popup: 'animate__animated animate__fadeOutUp'
                                }});
                              }
                              , error =>{ 
                                this.transaction_service.deleteTransaction(id_transaction).subscribe(
                                  data =>{},
                                  error =>{
                                    Swal.fire({
                                      title: 'Lo sentimos',
                                      text: 'Error en el Sistema. Inténtalo más tarde',   
                                      icon: 'error',             
                                      showClass: {
                                        popup: 'animate__animated animate__fadeInDown'
                                      },
                                      hideClass: {
                                        popup: 'animate__animated animate__fadeOutUp'
                                    }});
                                  }
                                ) ;                         
                                Swal.fire({
                                  title: 'Lo sentimos',
                                  text: 'Error en el Sistema. Inténtalo más tarde',   
                                  icon: 'error',             
                                  showClass: {
                                    popup: 'animate__animated animate__fadeInDown'
                                  },
                                  hideClass: {
                                    popup: 'animate__animated animate__fadeOutUp'
                                }});
                              }
                            );
    
                          }, error =>{
                            Swal.fire({
                              title: 'Lo sentimos',
                              text: 'Error en el Sistema. Inténtalo más tarde',   
                              icon: 'error',             
                              showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                              },
                              hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }});
                          }
                        ); 


                      }, error =>{                        
                         Swal.fire({
                              title: 'Lo sentimos',
                              text: 'Error en el Sistema. Inténtalo más tarde',   
                              icon: 'error',             
                              showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                              },
                              hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }});
                      }
                    );                                

                  },error =>{
                    Swal.fire({
                      title: 'Lo sentimos',
                      text: 'Error en el Sistema. Inténtalo más tarde',   
                      icon: 'error',             
                      showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }}); 
                  }
                  
                );
              }             
            }, error =>{
              console.log("Hubo un error");
              console.log(error);
              Swal.fire({
                title: 'Lo sentimos',
                text: 'Error en el Sistema. Inténtalo más tarde',   
                icon: 'error',             
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
              }}); 
            }
          );
          
        }
      },error =>{       
        console.log("Hubo un error");
        console.log(error);
        Swal.fire({
          title: 'Lo sentimos',
          text: 'Error en el Sistema. Inténtalo más tarde',   
          icon: 'error',             
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }}); 
      }
    );         
  }

 

  
  

}
