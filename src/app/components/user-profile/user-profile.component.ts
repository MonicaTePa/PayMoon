import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user_info : User | null = null;  
  id: string | any;

  constructor( private user_service: UserService, private userPath: ActivatedRoute) { 
    this.id = this.userPath.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(){
    this.user_service.getUserById(this.id).subscribe(
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
