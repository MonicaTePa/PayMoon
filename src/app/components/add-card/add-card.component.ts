import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service'; 

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  user_id: String = "623c1917b98cd2ec0b9e7fe3"
  
  cardRegisterForm: FormGroup;

  lettersRegex = /^[A-Za-z\s]+$/
  numbersRegex = /^[0-9]*$/;  
  emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

  constructor( private fb: FormBuilder, private card_service:CardService) {
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
  }

  cardRegister(){
    const cardData: Card = {
      id_user : this.user_id,
      card_number :this.cardRegisterForm.get('card_number')?.value,
      card_type :this.cardRegisterForm.get('card_type')?.value,
      expiration_date :this.cardRegisterForm.get('expiration_date')?.value,
      cvc :this.cardRegisterForm.get('cvc')?.value,
      country :this.cardRegisterForm.get('country')?.value,
      postal_code :this.cardRegisterForm.get('postal_code')?.value,
      card_name :this.cardRegisterForm.get('card_name')?.value,      
    }

    this.card_service.postCard(cardData).subscribe(
      data =>{
        console.log(data);
        console.log(cardData);

      },error =>{
        console.log("Hubo un error")
        console.log(error);

      }
    );
  }
  

}
