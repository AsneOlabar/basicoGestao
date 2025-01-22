import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
  hide = true;
  token;
  submitted = false;
  ano = new Date();
  returnUrl: string;
  recoveryForm = this.formBuilder.group({
    newPass: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!%$()-+*&@#])(?:([0-9a-zA-Z!%$*&@#])){8,}$/)]], 
    confirmPass: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!%$()-+*&@#])(?:([0-9a-zA-Z!%$*&@#])){8,}$/)]], 
  });  
   
  
  
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthenticationService,
    private spinner: NgxSpinnerService,
    private http: HttpClient

  ) { }



  ngOnInit(): void {
    if(localStorage.getItem('logado') == 'true'){
      this.snackBar.open( "Usuário com login ativo", 'X', {
        duration: 3000
      }) 
      this.router.navigate(['/']);
  
      
     }else{



       this.route.params.subscribe(params =>{ 
        this.token = params['a']
       if(params['a']){      
          
          
        this.http.get(`${environment.apiUrl}Payload`,{headers: {"Authorization": `Bearer ${params['a']}`}} )
       .subscribe((data)=>{
        if(data['status'] == 200){
          this.token =   params['a']
        }else{

          this.snackBar.open('Token inválido, refaça o processo!', "X", {duration: 3000})

          this.router.navigate(['/login']);

        }
      }, error =>{
        
        console.log(error);
        
        this.snackBar.open('Erro ao processar requisição', "X", {duration: 3000})
        this.router.navigate(['/login']);
      }
    );
    }
      else
      {
        this.router.navigate(['/login']);
      }
    });
      }
  }
  

  
  updateSenha() { //Envia o formulário de login para a API
    this.spinner.show();
    if(this.recoveryForm.controls['newPass'].value == this.recoveryForm.controls['confirmPass'].value ){

      this.http.post<any>(`${environment.apiUrl}User/Reset`, this.recoveryForm.value, {headers: {"Authorization": `Bearer ${this.token}`}})
      .subscribe(data => {
        this.snackBar.open(data['msg'], 'X', { duration: 3000})
        
      }, (erro) =>{
        
        this.snackBar.open( erro.msg, 'X', {
          duration: 3000
        }) 
      }
      
      
    )
  }else{
    this.snackBar.open( "A senhas não coincidem", 'X', {
      duration: 3000
    })  
  }
    
     this.spinner.hide();
 
    
  }
 
}
