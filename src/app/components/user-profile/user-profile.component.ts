import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user_info : User | null = null;  
  user_id: String = '623c1917b98cd2ec0b9e7fe3'

  constructor( private user_service: UserService) { 
    
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
  }

}
