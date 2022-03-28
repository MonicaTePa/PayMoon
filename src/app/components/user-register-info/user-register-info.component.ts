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

  constructor(private user_service: UserService) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(){
    this.user_service.getUserById(this.user_id).subscribe(
      data=>{        
        this.user_info = data;     
      },error=>{
        console.log("Hubo un error");
        console.log(error);
      }
    );
  }

}
