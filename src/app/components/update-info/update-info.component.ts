import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/common/global-constants';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {

  //user_id: String = "623c1917b98cd2ec0b9e7fe3"
  user_id: string = new GlobalConstants().getUserId();
  
  // user_id: any = localStorage.getItem("id");
  userUpdateForm : FormGroup;
  user: User | null = null;

  constructor( private fb:FormBuilder,private user_service:UserService) { 
    this.userUpdateForm = this.fb.group({
      phone_number: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      password_again: ['',[Validators.required]]     
    });
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(){
    this.user_service.getUserById(this.user_id).subscribe(
      data => {
        this.user = data
        this.userUpdateForm.setValue({
          phone_number: this.user?.phone_number,
          email: this.user?.email,
          password: this.user?.password,
          password_again: this.user?.password
        })
        // console.log(this.user)
        // console.log("current user",this.user)
      }, error =>{
        // console.log('Hubo un error');
        // console.log(error);
        Swal.fire(
          'Lo sentimos',
          'Error en el sistema. Intétalo más tarde o comunícate con administración si persiste.',
          'error'
        );
        
      }
    );
  }
  
  updateUser(): void{
    if (this.userUpdateForm.get('password')?.value === this.userUpdateForm.get('password_again')?.value){
      const userUpdate = this.user;
      if(userUpdate){
        userUpdate.phone_number = this.userUpdateForm.get('phone_number')?.value;
        userUpdate.email = this.userUpdateForm.get('email')?.value.toLowerCase();
        userUpdate.password = this.userUpdateForm.get('password')?.value;
        // console.log("Datos actualizados", userUpdate);
        this.user_service.updateUser(this.user_id, userUpdate).subscribe(
          data =>{
            if(data.code === 1){
              Swal.fire('Teléfono no disponible');
            }else if (data.code === 2){
              Swal.fire('Correo electrónico no disponible');
            }else if(data.code === 0){
              Swal.fire(
                'Actualización exitosa',
                'Tus datos se actualizaron correctamente.',
                'success'
              );
            }
          }, error =>{
            Swal.fire(
              'Lo sentimos',
              'Error en el sistema. Intétalo más tarde o comunícate con administración si persiste.',
              'error'
            );
          }
        );

      }      
    } else {
      Swal.fire('Las contraseñas no coinciden');           
    } 
  }

}
