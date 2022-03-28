import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { PocketService } from 'src/app/services/pocket.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user_info : User | null = null;  
  user_id: any = localStorage.getItem("id");

  constructor( private user_service: UserService, private pocket_service: PocketService) { 
    
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

}
