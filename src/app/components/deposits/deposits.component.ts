import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {

  user_id: String = "623c1917b98cd2ec0b9e7fe3"
  card_list: Card[] | null = null
  
  constructor( private card_service: CardService) { }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(){
    this.card_service.getCardsByUserId(this.user_id).subscribe(
      data =>{        
        this.card_list =  data;
      },error =>{
        console.log("Error")
        console.log(error);
      }
    );
  }



}
