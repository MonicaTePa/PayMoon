 import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AutenticationService } from './autentication.service';
@Injectable({
  providedIn: 'root',
})
export class TokensService implements HttpInterceptor {
  intercept(req, next) {
    let authService = this.injector.get(AutenticationService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${AutenticationService.getToken()}`,
      },
    });
    return next.handle(tokenizedReq);
  }

  constructor(private injector: Injector) {}
}
