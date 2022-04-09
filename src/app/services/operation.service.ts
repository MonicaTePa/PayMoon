import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deposit } from '../models/deposit.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  API_URL = 'http://localhost:3000/api/v1/'
  USER_URI1 = 'operations/transferences'
  USER_URI2 = 'operations/deposits'

  constructor( private http: HttpClient) { }

  makeTranference(transaction:Transaction): Observable<any>{
    return this.http.post(`${this.API_URL}/${this.USER_URI1}`,transaction);
  }

  makeDeposit(deposit: Deposit): Observable<any>{
    return this.http.post(`${this.API_URL}/${this.USER_URI2}`,deposit);
  }
}
