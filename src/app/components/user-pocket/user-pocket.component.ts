import { Component, OnInit } from '@angular/core';
import { Pocket } from 'src/app/models/pocket.model';
import { PocketService } from 'src/app/services/pocket.service';

@Component({
  selector: 'app-user-pocket',
  templateUrl: './user-pocket.component.html',
  styleUrls: ['./user-pocket.component.css']
})
export class UserPocketComponent implements OnInit {

  user_id: any = localStorage.getItem("id");
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
      }
    );
  }
}
