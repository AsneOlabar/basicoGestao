import { EventEmitter, Injectable, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })

export class MensagemService { //Realiza a leitura de mensagens


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    
  }

 
  leitura(usuario: string, orgao: string) { //Faz a requisição de autenticação e inicia as variáveis necessárias

    let formData: any = new FormData();

    formData.append('usuario', usuario);
    formData.append('orgao', orgao);
  

    return this.http.post<any>(`${environment.apiUrl}Mensagem`, formData)
      .pipe(map(mensagens => {
       
        if (mensagens === 1) { 
                    
          localStorage.setItem('logado' , 'true');
            this.router.navigate(['/'])
          return user;     
        }    
      }));
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    
  }

}