import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-user-register-info',
  templateUrl: './user-register-info.component.html',
  styleUrls: ['./user-register-info.component.css']
})
export class UserRegisterInfoComponent implements OnInit {

  user_info : User | null = null;
  user_birth_date: String | null = null;
  user_id_date: String | null = null;
  //user_id: String = '623c1917b98cd2ec0b9e7fe3'
  user_id: string = new GlobalConstants().getUserId();

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
        
        

      },error=>{
        console.log("Hubo un error");
        console.log(error);
      }
    );
  }

}
