import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegisterForm: FormGroup

  LETTER_REGEX = /^[A-Za-z\s]+$/
  NUMBER_REGEX = /^[0-9]*$/;  
  EMAIL_REGEX =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

  constructor( private fb: FormBuilder, private user_service: UserService ) { 
    this.userRegisterForm = this.fb.group({
      full_name: ['', [Validators.required,Validators.pattern(this.LETTER_REGEX)]],
      birth_date: [[Validators.required]],
      identification: ['', [Validators.required,Validators.pattern(this.NUMBER_REGEX)]],
      id_date: [[Validators.required]],
      phone_number: ['', [Validators.required,Validators.pattern(this.NUMBER_REGEX)]],
      email: ['', [Validators.required,Validators.pattern(this.EMAIL_REGEX)]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  userRegister(){
    const userData: User = {
      full_name: this.userRegisterForm.get('full_name')?.value,
      birth_date: this.userRegisterForm.get('birth_date')?.value,
      identification: this.userRegisterForm.get('identification')?.value,
      id_date: this.userRegisterForm.get('id_date')?.value,
      phone_number: this.userRegisterForm.get('phone_number')?.value,
      email: this.userRegisterForm.get('email')?.value,
      password: this.userRegisterForm.get('password')?.value,
    }
    this.user_service.postUser(userData).subscribe(data =>{
        console.log('Registro exitoso');
        console.log(userData);
      }, error =>{
        console.log(error);
        console.log("Hubo un error");
    });
  }
}
