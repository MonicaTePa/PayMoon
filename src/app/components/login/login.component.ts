import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Login } from 'src/app/models/login.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm: FormGroup;
  NUMBER_REGEX = /^[0-9]*$/;
  user_id: string = ''  

  constructor(private fb: FormBuilder, private user_service: UserService, private authService: AuthService, private router: Router) {
    this.userLoginForm = this.fb.group({
      identification: ['', Validators.required],
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

  onLoginUser(form: any): void{
    this.authService.login(form.value).subscribe(res => {
      this.router.navigate(['/miPerfil']);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Bienvenido otra vez a PayMoon',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Algo esta pasando',
        text: 'Comuniquese con el administrador'
      })
    });
  }

}
