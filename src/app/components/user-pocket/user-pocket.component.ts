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

  //user_id: String = "623c1917b98cd2ec0b9e7fe3"
  user_id = new GlobalConstants().getUserId();
  pocket_info: Pocket | null = null;

  constructor(private pocket_service: PocketService) { }

  ngOnInit(): void {
    this.loadPocketInfo();
  }

  loadPocketInfo(){
    this.pocket_service.getPocketById(this.user_id).subscribe(
      data => {
        console.log(data);
        this.pocket_info = data;
        console.log(this.pocket_info);
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
