import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private card_service: CardService, private router: Router) { }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(){
    this.card_service.getCardsByUserId(this.user_id).subscribe(
      data =>{ 
        this.card_list =  data;     
        // console.log(this.card_list)
        if(this.card_list.length === 0){
          Swal.fire('No tiene tarjetas registradas');         
        }
      },error =>{
        Swal.fire({
          title: 'Lo sentimos',
          text: 'Error en el Sistema. Inténtalo más tarde o comunícate con administración si persiste',   
          icon: 'error',             
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }});         
        /* console.log("Hubo un error",error); */
      }
    );
  }

  removeCard(card_id: String|undefined): void{
    if(card_id){
      console.log(card_id);
    Swal.fire({
      title: '¿Está seguro de eliminar esta tarjeta?',      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673FD7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar tarjeta',
      cancelButtonText: 'Cancelar'

    }).then((result) => {
      if (result.isConfirmed) {
        console.log("ID",card_id);
        this.card_service.deleteCard(card_id).subscribe(
          data =>{
            if(data.answer === "OK"){
              Swal.fire(
                'Tajeta eliminada',
                'La tarjeta se eliminó correctamente',
                'success'
              );
              const currentRoute = this.router.url;

              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate([currentRoute]); 
              });        
            }         
          }, error => {
            Swal.fire(
              'Lo sentimos',
              'Error en el sistema. Intétalo más tarde o comunícate con administración si persiste.',
              'error'
            );            
          }
        );       
      }
    });
    }
    

  }

}
