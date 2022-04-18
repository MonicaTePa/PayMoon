import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { GlobalConstants } from './common/global-constants';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  flag: boolean = false;
  
  constructor (private user_service: UserService, private router:Router, private cookie_service: CookieService){}
  canActivate(    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      
    
    const current_user = new GlobalConstants().getUserId();  
      this.user_service.checkUser(current_user).subscribe(
        data =>{
          if (data.answer === "OK"){
            this.flag = true;
          } else if (data.answer === "ERROR"){
            this.router.navigate(['/ingresar']);
          }
        }, error =>{
          console.log(error);         
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Algo esta pasando',
          //   text: 'Comuniquese con el administrador'
          // });
          this.router.navigate(['/ingresar']);
        }
      );
    console.log(this.flag);
    // if(this.flag === false){
    //   this.cookie_service.delete('jwt');
    //   sessionStorage.removeItem('user');
    // }
    return this.flag;
  }
  
}
