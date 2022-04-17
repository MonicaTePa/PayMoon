import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service'; 
import { GlobalConstants } from 'src/app/common/global-constants';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  //user_id: String = "623c1917b98cd2ec0b9e7fe3"

  user_id: string = new GlobalConstants().getUserId();
  
  cardRegisterForm: FormGroup;

  lettersRegex = /^[A-Za-z\s]+$/
  numbersRegex = /^[0-9]*$/;  
  emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  card_list: Card[] = [];  

  constructor( private fb: FormBuilder, private card_service:CardService, private router:Router) {
    this.cardRegisterForm = this.fb.group({
      card_number: ['',[Validators.required, Validators.pattern(this.numbersRegex)]],
      card_type: ['', [Validators.required, Validators.pattern(this.lettersRegex)]],
      expiration_date: ['',Validators.required],
      cvc: ['', [Validators.required, Validators.pattern(this.numbersRegex)]],
      country: ['', [Validators.required, Validators.pattern(this.lettersRegex)]],
      postal_code: ['',[Validators.required, Validators.pattern(this.numbersRegex)]],
      card_name: ['', [Validators.required, Validators.pattern(this.lettersRegex)]]
    });
   }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(){
    this.card_service.getCardsByUserId(this.user_id).subscribe(
      data =>{ 
        this.card_list =  data.data;
        // console.log(this.card_list.length);

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
        // console.log("Hubo un error",error);
      }
    );
  }

  cardRegister(){
    const cardData: Card = {
      id_user : this.user_id,
      card_number :this.cardRegisterForm.get('card_number')?.value,
      card_type :this.cardRegisterForm.get('card_type')?.value,
      expiration_date :this.cardRegisterForm.get('expiration_date')?.value,
      cvc :this.cardRegisterForm.get('cvc')?.value,
      country :this.cardRegisterForm.get('country')?.value.toUpperCase(),
      postal_code :this.cardRegisterForm.get('postal_code')?.value,
      card_name :this.cardRegisterForm.get('card_name')?.value.toUpperCase(),      
    }

    const existent_card = this.card_list.filter(card => card.card_name === cardData.card_name);
    if(existent_card.length>0){
      // console.log(existent_card);
      Swal.fire('Ya registraste una tarjeta con este nombre.');
    }else{
      this.card_service.postCard(cardData).subscribe(
        data =>{
          if(data.code === 0){
            Swal.fire({
              icon: 'success',
              title: 'Tarjeta registrada',
              text: 'Su tarjeta ha sido registrada exitosamente',              
            })  
            const currentRoute = this.router.url;

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
            });
          }else if (data.code === 1){
            Swal.fire('La tarjeta ya está registrada en el sistema');
          }
          
          // console.log(data);
          // console.log(cardData);
  
        },error =>{
          // console.log("Hubo un error")
          // console.log(error);
          Swal.fire({
            title: 'Lo sentimos',
            text: 'Error en el Sistema. Inténtalo más tarde o comunícate con administración si persiste',   
            icon: 'error',             
           }); 
        }
      );
    }
    }
    

    
}
