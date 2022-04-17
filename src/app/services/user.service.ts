import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 
import { Login } from '../models/login.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'http://localhost:3000/api/v1'
  USER_URI = 'users'
  AUTH_URI = 'auth'
  
  // cookieHeader: HttpHeaders;

  constructor( private http: HttpClient, private cookie_service: CookieService ) {
    this.cookie_service.get('jwt');   
    // this.cookieHeader = new HttpHeaders(); 
    // this.cookieHeader.set('Set-Cookie', )
  }

  postUser( user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/${this.USER_URI}`, user);
  }

  getUserById( id: String ): Observable<any> {
    return this.http.get(`${this.API_URL}/${this.USER_URI}/${id}`,{withCredentials: true});
  }

  getUserByPhone( phone_number: String ): Observable<any> {
    return this.http.get(`${this.API_URL}/${this.USER_URI}/phone/${phone_number}`);
  }

  deleteUser( id:String ): Observable<any>{
    return this.http.delete(`${this.API_URL}/${this.USER_URI}/${id}`);
  }

  // loginUser( loginInfo: Login): void {
  //   console.log(loginInfo.identification);
  //   console.log(loginInfo.password);
  // }  

  updateUser(id:String, user:User): Observable<any>{
    return this.http.put(`${this.API_URL}/${this.USER_URI}/${id}`,user);
  }

  signupUser(user: User): Observable<any>{
    return this.http.post(`${this.API_URL}/${this.AUTH_URI}/signup`, user);
  }

  loginUser( identification: string, password: string): Observable<any>{
    interface LoginInfo{
      identification: string;
      password: string;
    }
    const loginInfo: LoginInfo = {
      identification: identification,
      password: password,
    }
    return this.http.post(`${this.API_URL}/${this.AUTH_URI}/login`, loginInfo );
  }
  
   
}
