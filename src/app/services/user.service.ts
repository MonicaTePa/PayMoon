import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'http://localhost:3000/api/v1/'
  API_URI = 'users'

  constructor( private http: HttpClient ) {}

  postUser( user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/${this.API_URI}`, user);
  }

  loginUser( loginInfo: Login): void {
    console.log(loginInfo.identification);
    console.log(loginInfo.password);
  }  
   
}
