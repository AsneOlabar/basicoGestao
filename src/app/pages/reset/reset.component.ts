import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators,  FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../_services/authentication.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  hide = true;
  submitted = false;
  ano = new Date();
  returnUrl: string;
  resetForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.pattern(/[a-zA-Z.0-9]/)]],
    
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

  
   }

  }

  
  reset() { //Envia o formulário de login para a API
    this.spinner.show();
    let dado = {"userName": this.resetForm.value.userName}

    this.http.post<any>(`${environment.apiUrl}User/Recovery`, dado)
      .subscribe(data => {
        this.snackBar.open(data['msg'], 'X', { duration: 3000})

        this.resetForm.reset();
          
      }, (erro) =>{
                  
                  this.snackBar.open( erro.msg, 'X', {
            duration: 3000
          }) 
        }
        
      
    )
    
    this.spinner.hide();
 
    
  }
 

}
