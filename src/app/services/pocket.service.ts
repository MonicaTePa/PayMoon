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
}