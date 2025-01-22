import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators,  FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../_services/authentication.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../app.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  submitted = false;
  ano = new Date();
  returnUrl: string;
  loginForm = this.formBuilder.group({
    usuario: ['', [Validators.required, Validators.pattern(/[a-zA-Z.]/)]],
    password: ['', [Validators.required]], 
  });  
   
  
  
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthenticationService,
    private spinner: NgxSpinnerService
    
  ) { }



  ngOnInit(): void {
    
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || "/";

   if(localStorage.getItem('logado') == 'true'){

    this.router.navigate(['/']);


   }
  }

  
  login() { //Envia o formulário de login para a API
    this.spinner.show();
    this.auth.login(this.loginForm.value.usuario, this.loginForm.value.password)
    .subscribe(
      (data) => {
      
      if(data['code'] == 1){
        
        this.router.navigate([this.returnUrl]);

        this.snackBar.open(data.msg, 'X', { duration: 3000})

        
      }else{
        
        this.snackBar.open(data.msg, 'X', { duration: 3000})

      }

      }, (erro) =>{
                  
                  this.snackBar.open( erro.error.msg, 'X', {
            duration: 3000
          }) 
        }
        
      
    )
    
     this.spinner.hide();
 
    
  }
 

}
