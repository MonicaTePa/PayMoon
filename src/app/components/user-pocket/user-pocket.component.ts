import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Pocket } from 'src/app/models/pocket.model';
import { PocketService } from 'src/app/services/pocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-pocket',
  templateUrl: './user-pocket.component.html',
  styleUrls: ['./user-pocket.component.css']
})
export class UserPocketComponent implements OnInit {

  // user_id: any = localStorage.getItem("id");
  user_id: string = new GlobalConstants().getUserId();
  pocket_info: Pocket | null = null;

  constructor(private pocket_service: PocketService) { }

  ngOnInit(): void {
    this.loadPocketInfo();
  }

  loadPocketInfo(){
    this.pocket_service.getPocketById(this.user_id).subscribe(
      data => {
        this.pocket_info = data;
      },
      error => {
        console.log("Hubo un error");
        console.log(error);
        Swal.fire({
          title: 'Lo sentimos',
          text: 'Error en el Sistema. Inténtalo más tarde',   
          icon: 'error',             
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }}); 
      }
    );
  }
}
