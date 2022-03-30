import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtResponse } from '../models/jwt.response';
import { User } from '../models/user.model';
import { tap } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER: string = 'http://localhost:3000/api/v1';
  authSubject = new BehaviorSubject(false);
  private token: any;

  constructor(private httpClient: HttpClient, private router: Router) { }

  register(user: User): Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/users`, user)
    .pipe(tap(
      (res: JwtResponse) => {
        if(res){
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser._id);
        }
      })
    )

  }

  login(user: User): Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/login`, user)
    .pipe(tap(
      (res: JwtResponse) => {
        if(res){
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser._id);
        }
      })
    )
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("id");
    localStorage.removeItem("pocket_id");
    localStorage.removeItem("id_to_pay");
    this.router.navigate(['/']);
  }

  private saveToken(token: string, expiresIn: string, id: any): void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    localStorage.setItem("id", id)
    this.token = token;
  }

  private getToken(): any{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

}