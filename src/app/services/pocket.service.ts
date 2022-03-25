import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pocket } from '../models/pocket.model';


@Injectable({
  providedIn: 'root'
})
export class PocketService {

  API_URL = 'http://localhost:3000/api/v1/'
  USER_URI = 'pockets'

  constructor( private http: HttpClient ) {}  

  postPocket(pocket: Pocket): Observable<any>{
    return this.http.post(`${this.API_URL}/${this.USER_URI}`, pocket);
  }

  putPocket(id: String, pocket: Pocket): Observable<any>{
    return this.http.put(`${this.API_URL}/${this.USER_URI}/${id}`, pocket);
  }

  getPocket(id:String): Observable<any>{
    return this.http.get(`${this.API_URL}/${this.USER_URI}/${id}`);
  }

  getPocketById(id:String): Observable<any>{
    return this.http.get(`${this.API_URL}/${this.USER_URI}/user/${id}`);
  }  

  deletePocket( id:String ): Observable<any>{
    return this.http.delete(`${this.API_URL}/${this.USER_URI}/${id}`);
  }
}
