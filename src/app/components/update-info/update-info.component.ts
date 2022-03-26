import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {

  user_id: String = "623c1917b98cd2ec0b9e7fe3"
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
      }, error =>{
        console.log('Hubo un error')
        console.log(error)
      }
    );
  }

  updateUser(){
    if(this.user){
      console.log(this.user)
      const userUpdate: User ={
        full_name: this.user?.full_name,
        identification: this.user?.full_name,
        birth_date: this.user?.birth_date,
        id_date: this.user?.id_date, 
        phone_number: this.userUpdateForm.get('phone_number')?.value,    
        email: this.userUpdateForm.get('email')?.value,
        password: this.userUpdateForm.get('password')?.value,
      }     
      console.log(userUpdate);
      this.user_service.updateUser(this.user_id,userUpdate).subscribe(
        data =>{
          console.log(data);
        }, error =>{
          console.log('Hubo un error')
          console.log(error)
        }
      );
    }
    
  }

}
