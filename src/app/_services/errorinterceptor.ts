import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor { //captura os erros pra registro no log.
  
  constructor(private authenticationService: AuthenticationService,
    private snackbar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(
        map(res => {
            return res
         }),
        catchError((err: HttpErrorResponse) => {
      
      if (403 == err.status || 401 == err.status

      ) {

        /* auto logout se o código de retorno for 401 -
        Unauthorized ou 403 - Forbidden response returned from api*/
        this.snackbar.open("Seu token expirou, faça novo login", "X", {duration: 3000})
        this.authenticationService.logout();
      }

      const error = err.error || err.statusText;
      return throwError(error);
    }))
  }
}