import { Component, OnInit } from '@angular/core';
import { Deposit } from 'src/app/models/deposit.model';
import { DepositsService } from 'src/app/services/deposits.service';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';
import { Pocket } from 'src/app/models/pocket.model';
import { PocketService } from 'src/app/services/pocket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { GlobalConstants } from 'src/app/common/global-constants';
import Swal from 'sweetalert2';
import { OperationService } from 'src/app/services/operation.service';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {

  user_id: string = new GlobalConstants().getUserId()
  //user_id: string = "623c1917b98cd2ec0b9e7fe3"
  //user_id:string = "623fc410a14aa782fec3bf00"

  card_list: Card[] | null = null  

  depositRegisterForm: FormGroup;

  numbersRegex = /^[0-9]+$/;  
  
  constructor( private fb: FormBuilder, private card_service: CardService, private deposit_service: DepositsService, private pocket_service: PocketService, private operation_service: OperationService) {
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
        this.card_list =  data.data;
        if(data.answer === "OK"){
          Swal.fire({
            title: data.message,
            text: "Para recargar el bolsillo debe tener tarjetas registradas",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
        }  
        // console.log(this.card_list)
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
        }}) 

        console.log("Error")
        console.log(error);
      }
    );
  }

  pocketDeposit(){
    const id_card: string = this.depositRegisterForm.get('id_card')?.value;
    const amount: number = parseInt(this.depositRegisterForm.get('amount')?.value);
    const deposit: Deposit = {
      id_user: this.user_id,      
      id_card: id_card,
      amount:  amount?amount:0,
      type: "CARD"
    }
    if( typeof(deposit.id_card) !=='string' || deposit.amount <= 0){
      Swal.fire("Debe seleccionar una tarjeta e ingresar un valor mayor que cero");
    } else{
      const deposit: Deposit = {
        id_user: this.user_id,      
        id_card: id_card,
        amount:  amount?amount:0,
        type: "CARD"
      }    
     
      Swal.fire({
        title: '¿Está seguro?',
        text: `Usted va a depositar $${deposit.amount.toLocaleString()} en su bolsillo PayMoon`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hacer depósito'
      }).then((result) => {
        if (result.isConfirmed) {
          this.operation_service.makeDeposit(deposit).subscribe(
            data =>{
              // console.log(data);
              if ( data.answer === "OK" ){
                Swal.fire(
                  'Recarga exitosa',
                  `Usted depositó $${deposit.amount.toLocaleString()} en su bolsillo PayMoon `,
                  'success'
                )
              }
            }, error =>{
              Swal.fire({
                title: 'Lo sentimos',
                text: 'Error en el Sistema. Inténtalo más tarde o comunícate con administración si persiste',   
                icon: 'error',             
               });                
            }
          );
        }
      });          
    }
        

        
      
    }
      //     Swal.fire({
      //       text: 'Escoja una tarjeta e ingrese un valor mayor que cero para recargar el bolsillo',
      //       showClass: {
      //         popup: 'animate__animated animate__fadeInDown'
      //       },
      //       hideClass: {
      //         popup: 'animate__animated animate__fadeOutUp'
      //       }
      //     })

  }

  // pocketDeposit(){
    
  //   const id_card: string = this.depositRegisterForm.get('id_card')?.value
  //   const amount: number = parseInt(this.depositRegisterForm.get('amount')?.value)   
  //   console.log(typeof(id_card))

  //   const deposit: Deposit = {
  //     id_user: this.user_id,      
  //     id_card: id_card,
  //     amount:  amount?amount:0,
  //     type: "CARD"
  //   }
  //   if( typeof(deposit.id_card) !=='string' || deposit.amount <= 0){
  //     Swal.fire({
  //       text: 'Escoja una tarjeta e ingrese un valor mayor que cero para recargar el bolsillo',
  //       showClass: {
  //         popup: 'animate__animated animate__fadeInDown'
  //       },
  //       hideClass: {
  //         popup: 'animate__animated animate__fadeOutUp'
  //       }
  //     });
  //   }else{
  //     this.deposit_service.postDeposit(deposit).subscribe(
  //       data=>{
  //         if(data.answer === "OK"){
  //           console.log(data);
  //           const id_deposit = data.id;
  //           this.pocket_service.getPocketById(this.user_id).subscribe(
  //             data =>{
  //               if(!data.message){
  //                 const pocket: Pocket = data;
  //                 const newPocket: Pocket = {          
  //                   id_user: deposit.id_user,
  //                   balance: pocket.balance? pocket.balance + deposit.amount: deposit.amount,
  //                   receptions: pocket.receptions,
  //                   payments: pocket.payments,
  //                   deposits: pocket.deposits? pocket.deposits + deposit.amount: deposit.amount,
  //                   former_balance: pocket.balance, 
  //                   last_deposit: deposit.amount 
  //                 }
  //                 if(pocket._id){
  //                   this.pocket_service.putPocket(pocket._id,newPocket).subscribe(
  //                     data =>{                        
  //                       this.deposit_service.postDeposit(deposit).subscribe(data =>{                                        
  //                         if(data.answer === "OK"){
  //                           Swal.fire({
  //                             title: 'Recarga exitosa',                   
  //                             icon: 'success',             
  //                             showClass: {
  //                               popup: 'animate__animated animate__fadeInDown'
  //                             },
  //                             hideClass: {
  //                               popup: 'animate__animated animate__fadeOutUp'
  //                           }})   
  //                         }else{
  //                           this.deposit_service.deleteDeposit(id_deposit).subscribe( data=>{
  //                             Swal.fire({
  //                               title: 'Lo sentimos',
  //                               text: 'Error en el Sistema. Inténtalo más tarde',   
  //                               icon: 'error',             
  //                               showClass: {
  //                                 popup: 'animate__animated animate__fadeInDown'
  //                               },
  //                               hideClass: {
  //                                 popup: 'animate__animated animate__fadeOutUp'
  //                             }})  
  //                           }, error =>{
  //                             Swal.fire({
  //                               title: 'Lo sentimos',
  //                               text: 'Error en el Sistema. Inténtalo más tarde',   
  //                               icon: 'error',             
  //                               showClass: {
  //                                 popup: 'animate__animated animate__fadeInDown'
  //                               },
  //                               hideClass: {
  //                                 popup: 'animate__animated animate__fadeOutUp'
  //                             }})  
  //                           }
                              
  //                           );
  //                           Swal.fire({
  //                             title: 'Lo sentimos',
  //                             text: 'Error en el Sistema. Inténtalo más tarde',   
  //                             icon: 'error',             
  //                             showClass: {
  //                               popup: 'animate__animated animate__fadeInDown'
  //                             },
  //                             hideClass: {
  //                               popup: 'animate__animated animate__fadeOutUp'
  //                           }})                  
  //                         }
  //                       },error=>{
  //                         console.log(error);
  //                         Swal.fire({
  //                           title: 'Lo sentimos',
  //                           text: 'Error en el Sistema. Inténtalo más tarde',   
  //                           icon: 'error',             
  //                           showClass: {
  //                             popup: 'animate__animated animate__fadeInDown'
  //                           },
  //                           hideClass: {
  //                             popup: 'animate__animated animate__fadeOutUp'
  //                         }})
  //                       });            
  //                     }, error =>{
  //                       Swal.fire({
  //                         title: 'Lo sentimos',
  //                         text: 'Error en el Sistema. Inténtalo más tarde',   
  //                         icon: 'error',             
  //                         showClass: {
  //                           popup: 'animate__animated animate__fadeInDown'
  //                         },
  //                         hideClass: {
  //                           popup: 'animate__animated animate__fadeOutUp'
  //                       }});                        
  //                     }
  //                   )}
  //               }
  //             },error =>{

  //             }
  //           );            
  //         }        
  //       },error =>{
  //         console.log(error);
  //         Swal.fire({
  //           title: 'Lo sentimos',
  //           text: 'Error en el Sistema. Inténtalo más tarde',   
  //           icon: 'error',            
  //           showClass: {
  //             popup: 'animate__animated animate__fadeInDown'
  //           },
  //           hideClass: {
  //             popup: 'animate__animated animate__fadeOutUp'
  //         }})  
  //       }
  //     );
  //   } 
  // } 
   

