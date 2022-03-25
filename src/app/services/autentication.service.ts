import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
 
export class AutenticationService { 
 
 
  private _registerUrl = 'http://localhost:3000/api/v1/users';
  private _loginUrl = 'http://localhost:3000/api/v1/users/login';
  constructor(private http: HttpClient, private _router: Router) {}
 // let user = Users.find((user: any) => user.id === query); 
  
  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
    
  }
  logoutUser() {
  
  localStorage.removeItem('token');
 
  this._router.navigate(['/ingresar']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
   
  
 
}

