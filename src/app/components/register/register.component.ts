import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { PocketService } from 'src/app/services/pocket.service';
import { UserService } from 'src/app/services/user.service';
import { Pocket } from 'src/app/models/pocket.model';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


//import { FormBuilder,FormGroup, Validators } from '@angular/forms';
//import { ActivatedRoute, Router } from '@angular/router';
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

  constructor( private fb: FormBuilder, private user_service: UserService, private pocket_service: PocketService, private authService: AuthService, private router: Router) { 
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

  // onUserRegister(form: any): void {
  //   this.authService.register(form.value).subscribe(data => {
  //     const pocket: Pocket = {id_user: data.dataUser._id}
  //     this.pocket_service.postPocket(pocket).subscribe(data =>{
  //         this.router.navigate(['/ingresar']);
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Felicidaded! Bienvenido a PayMoon',
  //           text: 'Tu Bolsillo ha sido creado Correctamente'
  //         })
  //       }, error => {
  //         console.log(error)
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Algo esta pasando con la creacion de su Bolsillo',
  //           text: 'Comuniquese con el administrador'            
  //         })
  //       } );
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Felicidaded! Eres un nuevo usuario de PayMoon',
  //       text: 'Te registraste correctamente'
  //     })
  //   }, error =>
  //    {console.log(error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Algo esta pasando',
  //       text: 'Comuniquese con el administrador'
  //     });
  //   });
  // }

  onUserRegister(): void{
    
    const user: User = {
      full_name : this.userRegisterForm.get('full_name')?.value.toUpperCase(),
      birth_date : this.userRegisterForm.get('birth_date')?.value,
      identification : this.userRegisterForm.get('identification')?.value,
      id_date : this.userRegisterForm.get('id_date')?.value,
      phone_number : this.userRegisterForm.get('phone_number')?.value,
      email : this.userRegisterForm.get('email')?.value.toLowerCase(),      
      password : this.userRegisterForm.get('password')?.value
    }
    //  console.log(user);
    this.user_service.postUser(user).subscribe(
      data =>{
        // console.log("registro exitoso", data);
        if(data.code === 1){       
          Swal.fire('Identificación ya registrada');
        } else if(data.code === 2){
          Swal.fire('Teléfono ya registrado');
        } else if(data.code === 3){
          Swal.fire('Email ya registrado');
        } else {          
          const user_id = data._id;
          // console.log(user_id);
          const pocket: Pocket = {id_user: user_id}
          this.pocket_service.postPocket(pocket).subscribe(
            data =>{   
              // console.log(data) ;       
              Swal.fire({
                icon: 'success',
                title: '¡Bienvenido a PayMoon!',
                text: 'Tu bolsillo ha sido creado.'                
              });
              this.router.navigate(['/ingresar']);
            }, error =>{
              this.user_service.deleteUser(user_id).subscribe(
                data =>{
                  // console.log("Hubo un error", error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Algo esta pasando',
                    text: 'Comuniquese con el administrador si persiste.'
                  });
                }, error =>{
                  // console.log("Hubo un error", error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Algo esta pasando',
                    text: 'Comuniquese con el administrador si persiste.'
                  });
                }
              );
            }
          );
        }
      }, error =>{
        // console.log("Hubo un error", error);
        Swal.fire({
          icon: 'error',
          title: 'Algo esta pasando',
          text: 'Comuniquese con el administrador si persiste.'
        });
      }
    );
  }

  signup():void {
    const user: User = {
      full_name : this.userRegisterForm.get('full_name')?.value.toUpperCase(),
      birth_date : this.userRegisterForm.get('birth_date')?.value,
      identification : this.userRegisterForm.get('identification')?.value,
      id_date : this.userRegisterForm.get('id_date')?.value,
      phone_number : this.userRegisterForm.get('phone_number')?.value,
      email : this.userRegisterForm.get('email')?.value.toLowerCase(),      
      password : this.userRegisterForm.get('password')?.value
    }
    this.user_service.signupUser(user).subscribe(
      data =>{
        if(data.code === 1){       
          Swal.fire('Identificación ya registrada');
        } else if(data.code === 2){
          Swal.fire('Teléfono ya registrado');
        } else if(data.code === 3){
          Swal.fire('Email ya registrado');
        } else {          
          const user_id = data._id;
          // console.log(user_id);
          const pocket: Pocket = {id_user: user_id}
          this.pocket_service.postPocket(pocket).subscribe(
            data =>{   
              // console.log(data) ;       
              Swal.fire({
                icon: 'success',
                title: '¡Bienvenido a PayMoon!',
                text: 'Tu bolsillo ha sido creado.'                
              });
              this.router.navigate(['/ingresar']);
            }, error =>{
              this.user_service.deleteUser(user_id).subscribe(
                data =>{
                  // console.log("Hubo un error", error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Algo esta pasando',
                    text: 'Comuniquese con el administrador si persiste.'
                  });
                }, error =>{
                  // console.log("Hubo un error", error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Algo esta pasando',
                    text: 'Comuniquese con el administrador si persiste.'
                  });
                }
              );
            }
          );
        }
      }, error =>{
        Swal.fire({
          icon: 'error',
          title: 'Algo esta pasando',
          text: 'Comuniquese con el administrador si persiste.'
        });
      }
    );
  }

}
