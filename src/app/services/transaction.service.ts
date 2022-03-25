import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  API_URL = 'http://localhost:3000/api/v1/'
  USER_URI = 'transactions'

  constructor(private http: HttpClient) { }

  postTransaction(transaction: Transaction): Observable<any>{
    return this.http.post(`${this.API_URL}/${this.USER_URI}`, transaction);
  }

  getTransactionByUserId(user_id: string): Observable<any>{
    return this.http.get(`${this.API_URL}/${this.USER_URI}/user/${user_id}`);
  }
}
