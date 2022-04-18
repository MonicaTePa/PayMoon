import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Login } from 'src/app/models/login.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm: FormGroup;
  NUMBER_REGEX = /^[0-9]*$/;
  user_id: string = '';  

  constructor(private fb: FormBuilder, private user_service: UserService, private authService: AuthService, private router: Router, private activatedRouter: ActivatedRoute, private cookie_service: CookieService) {
    this.userLoginForm = this.fb.group({
      identification: ['', Validators.required],
      password: ['',[Validators.required]]
    });
   }

  ngOnInit(): void {
    // this.cookie_service.delete('jwt');
    // sessionStorage.removeItem('user');
  }

  onLoginUser(form: any): void{
    this.authService.login(form.value).subscribe(res => {
      this.router.navigate(['/miPerfil']);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Bienvenido otra vez a PayMoon',
        showConfirmButton: false,
        timer: 1500
      })
      this.user_id = res.dataUser._id;
    }, error => {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Algo esta pasando',
        text: 'Comuniquese con el administrador'
      })
    });
  }

  login(): void{
    const identification: string = this.userLoginForm.get('identification')?.value;
    const password: string = this.userLoginForm.get('password')?.value;
    console.log([identification,password])
    this.user_service.loginUser(identification,password).subscribe(
      data =>{
        if(data.code === 1){
          Swal.fire('Usuario no registrado');
        } else if (data.code === 2){
          Swal.fire('Contraseña incorrecta');
        }else{          
          this.cookie_service.set('jwt', data.token, 3);
          sessionStorage.setItem('user', data. user); 
          this.router.navigate(['/miPerfil']);  
        }
        console.log(data);
      }, error =>{
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Algo esta pasando',
          text: 'Comuniquese con el administrador'
        });
      }
    );
  }

}
