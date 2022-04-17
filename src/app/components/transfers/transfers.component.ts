import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction} from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';
import { PocketService } from 'src/app/services/pocket.service';
import { Pocket } from 'src/app/models/pocket.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GlobalConstants } from 'src/app/common/global-constants';
import { OperationService } from 'src/app/services/operation.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {

  // user_id: any = localStorage.getItem("id");
  pocket_id: any = localStorage.getItem("pocket_id");
  
  user_id: string = new GlobalConstants().getUserId();



  card_list: Card[] | null = null
  pocket_former_balence: number = 0;
  latest_deposite: number = 0;

  transferRegisterForm: FormGroup;

  numbersRegex = /^[0-9]+$/;  
  
  constructor(private fb: FormBuilder, private user_service: UserService, private transaction_service: TransactionService, private card_service: CardService, private pocket_service: PocketService, private operation_service: OperationService, private router: Router) { 
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
        this.card_list =  data.data;
      },error =>{
        Swal.fire({
          title: 'Lo sentimos',
          text: 'Error en el Sistema. Inténtalo más tarde o comunícate con administración si persiste',   
          icon: 'error',             
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }}); 
        /* console.log("Error")
        console.log(error); */
      }
    );
  }

  /* makeTransfer(){
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
          console.log(id_receiver)
          const transaction : Transaction = {            
            id_payer: this.user_id,
            id_receiver: id_receiver,
            amount: transfer_amount,
            type: id_card === "none"?"BOLSILLO":"TARJETA",
            id_card: id_card === "none"?"NO APLICA":id_card
          }
          this.transaction_service.postTransaction(transaction).subscribe(
            DataTransfer =>{
              this.pocket_service.getPocketById(id_receiver).subscribe(
                dataPocket=>{
                  const pocket: Pocket = { 
                    id_user: id_receiver,
                    balance: dataPocket.balance + transfer_amount,
                    receptions: dataPocket.receptions + parseInt(transfer_amount),
                    payments: dataPocket.payments,
                    deposits: dataPocket.deposits,
                  }
                  console.log(dataPocket)
                  this.pocket_service.putPocket(dataPocket._id, pocket).subscribe(
                    data=>{
                      this.router.navigate(['/miPerfil']);
                    }
                  )

                }
              )         
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

    this.pocket_service.getPocketById(this.user_id).subscribe(
      data=>{
        const pocket: Pocket = {
          _id: this.pocket_id,
          id_user: this.user_id,
          balance: data.balance - transfer_amount,
          receptions: data.receptions,
          payments: data.payments + parseInt(transfer_amount),
          deposits: data.deposits,
        }
        this.pocket_service.putPocket(this.pocket_id, pocket).subscribe(
          data=>{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Transacción Realizada',
              text: 'Su Bolsillo ha sido actualizado',
              showConfirmButton: false,
              timer: 1500
            })
            })
          }
        )


   
  
  } */

  makeTransfer(){
    const phone_number = this.transferRegisterForm.get('receiver_phone')?.value
    const transfer_amount = parseInt(this.transferRegisterForm.get('amount')?.value);
    const id_card = this.transferRegisterForm.get('id_card')?.value       
    
    this.user_service.getUserByPhone(phone_number).subscribe(
      data =>{
        if(data.code === 1){
          Swal.fire('El teléfono ingresado no está registrado en PayMoon');
        }else{
          Swal.fire({
            title: '¿Está seguro de esta tranferencia?',  
            text:`Usted tranferirá $${transfer_amount.toLocaleString()} al usuario con teléfono ${phone_number}`,    
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#673FD7',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hacer transferencia',
            cancelButtonText: 'Cancelar'
      
          }).then((result) => {
            const id_receiver: string = data;
          //console.log(id_receiver);
          const transaction : Transaction = {            
            id_payer: this.user_id,
            id_receiver: id_receiver,
            amount: transfer_amount,
            type: id_card === "none"?"BOLSILLO":"TARJETA",
            id_card: id_card === "none"?"NO APLICA":id_card
          }
          //console.log(transaction);
          this.operation_service.makeTranference(transaction).subscribe(
            data =>{
              //console.log(data);
              if(data.code === 1){
                Swal.fire('No tiene en el bolsillo el dinero suficiente para esta transacción');
              }else if(data.code === 0){
                Swal.fire({
                  title: 'Transacción exitosa',
                  text: `El dinero fue correctamente transferido al usuario con teléfono ${phone_number}`,   
                  icon: 'success'
                });
              }              
            }, error =>{
              //console.log(error);
              Swal.fire({
                title: 'Lo sentimos',
                text: 'Error en el Sistema. Inténtalo más tarde o comunícate con administración si persiste',   
                icon: 'error'
              });
            }
          );
      
          });
          
        }        
      },error =>{
        Swal.fire({
          title: 'Lo sentimos',
          text: 'Error en el Sistema. Inténtalo más tarde o comunícate con administración si persiste',   
          icon: 'error'
        });
      }
    );
  }

}
