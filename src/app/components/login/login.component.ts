import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../services/autentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
 
export class LoginComponent implements OnInit {
 
  loginUserData = {
    email: '',
    password: '',
  };
  constructor(private _auth: AutenticationService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}
 
  loginUser(){
  try{
    this._auth.loginUser(this.loginUserData).subscribe((res) => {
    const tokens= localStorage.setItem('token', res.data.token);
     this.toastr.info('Lo sentimos', 'No esta Registrado!');
  
        console.log(res.data.token);
        
    this.router.navigate(['/historial']);
    
    
    });
  }

    catch(error){
     alert("error");
}
}

