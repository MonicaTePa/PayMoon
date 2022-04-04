import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { PocketService } from 'src/app/services/pocket.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user_info : User | null = null;  
  // user_id: any = localStorage.getItem("id");
  user_id: string = new GlobalConstants().getUserId();

  constructor( private user_service: UserService, private pocket_service: PocketService, private auth_service: AuthService, private router: Router ) { 
    
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(){
    this.user_service.getUserById(this.user_id).subscribe(
      data=>{
        this.user_info = data;        
        console.log(this.user_info);
      },error=>{
        console.log("Hubo un error");
        console.log(error);
      }
    );
    this.pocket_service.getPocketById(this.user_id).subscribe(
      data=>{
        localStorage.setItem("pocket_id", data._id);
      }
    )
  }

  onLogOut(){
    Swal.fire({
      title: '¿Desea cerrar sesion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3927D0',
      cancelButtonColor: '#B366DA',
      confirmButtonText: 'Si, cerrar sesion'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth_service.logout();
        Swal.fire({
          icon: 'success',
          title: 'Vuelve Pronto!',
          timer: 2000
        });
      }
    })
  }

}
