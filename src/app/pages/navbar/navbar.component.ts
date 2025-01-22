import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { log } from 'console';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css','../../app.component.css']
})
export class NavbarComponent implements OnInit {

@Input()
atalhos=[];
foto = "../../assets/images/padrao.jpg";
hide= true;
pass;
atual;
nova;
confirmacao;
user;

mensagem;
dataSource: any;
route;
isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver,     
  private router: Router,
  private http: HttpClient,
  private auth: AuthenticationService,
  public dialog: MatDialog,
  private formBuilder: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,

  ) {}


ngOnInit(): void {
  this.user = JSON.parse(localStorage.getItem('user'));
  this.atalhos = this.user.permissoes;
  
  this.getFoto(this.user['cpf']);
  
}

url(){
  return this.router.url
}

getFoto(cpf){
  this.http.get(`${environment.apiUrl}FotoCpf/${cpf}`)
  .subscribe(data =>{
    if(data['status'] == 200 && data['code']== 1){
      
      this.foto = data['foto']
    }

  }, erro=> {

    console.log(erro);
    
  })
}
logout(){
this.auth.logout()
}

updateSenhaForm = this.formBuilder.group({
  oldPass: ['', [Validators.required]], 
  newPass: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!%$()-+*&@#])(?:([0-9a-zA-Z!%$*&@#])){8,}$/)]], 
  confirmPass: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!%$()-+*&@#])(?:([0-9a-zA-Z!%$*&@#])){8,}$/)]],
  userName:[,[]]
});  

updateSenha() { 

  this.spinner.show();

  if(this.updateSenhaForm.controls['newPass'].value == this.updateSenhaForm.controls['confirmPass'].value ){

  this.updateSenhaForm.controls['userName'].setValue(this.user.user_name)
 
  this.http.post<any>(`${environment.apiUrl}User/UpdateSenhaAD`, this.updateSenhaForm.value)
    .subscribe(data => {
      this.snackBar.open(data['msg'], 'X', { duration: 3000})
      this.updateSenhaForm.reset();
      var btnsenha = document.getElementById('closeSenha'); btnsenha.click();
      this.updateSenhaForm.reset();
      this.spinner.hide();
      
    }, (erro) =>{
      
      this.snackBar.open( erro.msg, 'X', {
        duration: 3000
        
        
      }) 
      this.updateSenhaForm.reset();
      this.spinner.hide();
      }
      
      
  )}else{
    this.snackBar.open( "A senhas não coincidem", 'X', {
      duration: 3000
    }) 
  }



  
}



updateTelForm = this.formBuilder.group({
  pass: ['', [Validators.required]], 
  tel: ['', [Validators.required]], 
  userName: [,[]],
  cpf: [,[]]
});  

updateTel() { //Envia o formulário de login para a API
  
  
  this.spinner.show();

  this.updateTelForm.controls['userName'].setValue(this.user.user_name)
  this.updateTelForm.controls['cpf'].setValue(this.user.cpf)

  
  this.http.post<any>(`${environment.apiUrl}User/UpdateTelAD`, this.updateTelForm.value)
    .subscribe(data => {
      this.snackBar.open(data['msg'], 'X', { duration: 3000})
      this.updateTelForm.reset();
      var btnsenha = document.getElementById('closeTel'); btnsenha.click();
      this.spinner.hide();


        
    }, (erro) =>{
                
                this.snackBar.open( erro.msg, 'X', {
          duration: 3000
        }) 
        this.updateTelForm.reset();
        this.spinner.hide();
      }

    
  )


  
}
updateMailForm = this.formBuilder.group({
  pass: ['', [Validators.required]], 
  mail: ['', [Validators.required, Validators.email]], 
  cpf: ['', []], 
  userName:[,[]]
});  

updateMail() { //Envia o formulário de login para a API
  
  this.spinner.show();

  this.updateMailForm.controls['userName'].setValue(this.user.user_name)
  this.updateMailForm.controls['cpf'].setValue(this.user.cpf)

 
  this.http.post<any>(`${environment.apiUrl}User/UpdateMailAD`, this.updateMailForm.value)
    .subscribe(data => {

      this.snackBar.open(data['msg'], 'X', { duration: 3000})
      this.updateMailForm.reset();
      var btnsenha = document.getElementById('closeMail'); btnsenha.click();
      this.spinner.hide();

    }, (erro) =>{
                
                this.snackBar.open( erro.msg, 'X', {
          duration: 3000
        }) 
        this.updateMailForm.reset();

        this.spinner.hide();
      }
      
    
  )


  
}
}