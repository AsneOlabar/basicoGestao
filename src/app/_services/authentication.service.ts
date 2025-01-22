import { EventEmitter, Injectable, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })

export class AuthenticationService { //Realiza o serviço de autenticação junto a api


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    
  }

 
  login(usuario: string, password: string) { //Faz a requisição de autenticação e inicia as variáveis necessárias
   
    let data = {"userName": usuario, "pass": password}

    return this.http.post<any>(`${environment.apiUrl}Auth`, data)
      .pipe(map(user => {
        
        if (user.status === 200) { 
                    
          localStorage.setItem('logado' , 'true');

          let payload = JSON.parse(atob(user.Authorization.split('.')[1]));
       
        localStorage.setItem('user',JSON.stringify(payload['usuario']));
               
        localStorage.setItem('authorization', user.Authorization);
            
          }  
          return user;     
        }));
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
    
  }

 

}