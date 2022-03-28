import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register-info',
  templateUrl: './user-register-info.component.html',
  styleUrls: ['./user-register-info.component.css']
})
export class UserRegisterInfoComponent implements OnInit {

  user_info : User | null = null;
  user_id: any = localStorage.getItem("id");
  user_birth_date: string | null = null;
  user_id_date: string | null = null;

  constructor(private user_service: UserService) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(){
    this.user_service.getUserById(this.user_id).subscribe(
      data=>{        
        this.user_info = data;        
        console.log(this.user_info);
        console.log(this.user_info?.birth_date)
        this.user_birth_date = String(this.user_info?.birth_date).substring(0,10);
        this.user_id_date = String(this.user_info?.id_date).substring(0,10);
        
        

        //this.user_info = data;     
      },error=>{
        console.log("Hubo un error");
        console.log(error);
      }
    );
  }

}
