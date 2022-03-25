import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'http://localhost:3000/api/v1/'
  USER_URI = 'users'

  constructor( private http: HttpClient ) {}

  postUser( user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/${this.USER_URI}`, user);
  }

  getUserById( id: String ): Observable<any> {
    return this.http.get(`${this.API_URL}/${this.USER_URI}/${id}`);
  }

  getUserByPhone( phone_number: String ): Observable<any> {
    return this.http.get(`${this.API_URL}/${this.USER_URI}/phone/${phone_number}`);
  }

  deleteUser( id:String ): Observable<any>{
    return this.http.delete(`${this.API_URL}/${this.USER_URI}/${id}`);
  }

  loginUser( loginInfo: Login): void {
    console.log(loginInfo.identification);
    console.log(loginInfo.password);
  }  

  updateUser(id:String, user:User): Observable<any>{
    return this.http.put(`${this.API_URL}/${this.USER_URI}/${id}`,user);
  }
   
}
