import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css']
})
export class CardCollectionComponent implements OnInit {

  user_id: string = new GlobalConstants().getUserId();
  card_list: Card[] = []; 


  constructor(private card_service: CardService) { }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(){
    this.card_service.getCardsByUserId(this.user_id).subscribe(
      data =>{ 
        this.card_list =  data;
        // console.log(this.card_list)
      },error =>{
        Swal.fire({
          title: 'Lo sentimos',
          text: 'Error en el Sistema. Inténtalo más tarde',   
          icon: 'error',             
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }})         
        console.log("Hubo un error",error);
      }
    );
  }

  removeCard(card_id: String|undefined): void{
    console.log(card_id)
  }

}
