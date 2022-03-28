import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model'; 

@Injectable({
  providedIn: 'root'
})
export class CardService { 

  API_URL = 'http://localhost:3000/api/v1'
  USER_URI = 'cards'

  constructor( private http: HttpClient) { }
 
  postCard(card: Card): Observable<any>{
    return this.http.post(`${this.API_URL}/${this.USER_URI}`, card);
  }

  getCardsByUserId(id:String): Observable<any>{
    return this.http.get(`${this.API_URL}/${this.USER_URI}/user/${id}`);
  }

  getCardById(id:String): Observable<any>{
    return this.http.get(`${this.API_URL}/${this.USER_URI}/user/${id}`);
  }

  putCard(id: String,card: Card): Observable<any>{
    return this.http.post(`${this.API_URL}/${this.USER_URI}`, card);
  }

  

  deleteCard( id:String ): Observable<any>{
    return this.http.delete(`${this.API_URL}/${this.USER_URI}/${id}`);
  }

}
