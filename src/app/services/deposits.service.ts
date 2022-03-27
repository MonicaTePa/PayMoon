import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deposit } from '../models/deposit.model';

@Injectable({
  providedIn: 'root'
})
export class DepositsService {

  API_URL = 'http://localhost:3000/api/v1/'
  USER_URI = 'deposits'

  constructor(private http: HttpClient) { }

  postDeposit(deposit:Deposit): Observable<any>{
    return this.http.post(`${this.API_URL}/${this.USER_URI}`, deposit);
  }


  


}
