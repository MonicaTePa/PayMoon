import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm: FormGroup;
  NUMBER_REGEX = /^[0-9]*$/;  

  constructor(private fb: FormBuilder, private user_service: UserService) {
    this.userLoginForm = this.fb.group({
      identification: ['', [Validators.required,Validators.pattern(this.NUMBER_REGEX)]],
      password: ['',[Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  loginUser(){
    const loginInfo: Login = {
      identification: this.userLoginForm.get('identification')?.value,
      password: this.userLoginForm.get('password')?.value
    }  
    this.user_service.loginUser(loginInfo);
  }

}
