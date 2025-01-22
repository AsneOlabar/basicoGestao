import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpSInterceptor implements HttpInterceptor {



    intercept(request: HttpRequest<any>, next: HttpHandler): 
      Observable<HttpEvent<any>> {
        let isLoggedIn

        const Authorization = localStorage.getItem('authorization');
        if(localStorage.getItem('logado')){
          isLoggedIn = true;
          
        }
    const isApiUrl = request.url.startsWith(environment.apiUrl);
      
    if (isLoggedIn && isApiUrl && Authorization) {
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${Authorization}`
        }
      });
    }
    return next.handle(request);
  }
}