import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthGuard  {

    /* Guarda de rota para que somente seja exibido conteúdo para pessoas logadas*/

   
    constructor(
        private router: Router
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let verifica = this.verificacao(route, state)       
        if (JSON.parse(localStorage.getItem('logado'))){
            
                if(verifica == true){
                    return true
                }else{
                    this.router.navigate(['/']);  
                    return false
                }
                
        }       
           /* Com memorização da rota requisitada Se não estiver logado será redirecionado para a 
           página de login e após login direcionado pára a rota inicial*/

            //this.router.navigate(['/login']);
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;

    }
      
    verificacao(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){ // verifica a permissão para acessar
        if(localStorage.getItem('user')){

            try{

                
                let user = JSON.parse(localStorage.getItem('user'))
                let modulos =user['modulos']
               
                if(modulos && modulos.indexOf(route.routeConfig.path) >= 0){
                    return true
                }
                
            }catch{

                return false
            }
        }
       
        return false
    }

}