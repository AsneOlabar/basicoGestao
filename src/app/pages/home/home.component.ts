import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component' 
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../app.component.css']
})
export class HomeComponent implements OnInit{


  constructor(private http: HttpClient, private snackbar: MatSnackBar, 
    private auth: AuthenticationService,
    private spinner: NgxSpinnerService
    ) {}
    
    ngOnInit(): void {
          this.spinner.show()
         this.http.get(`${environment.apiUrl}Payload`)
         .subscribe((data)=>{
         
          

          let temp = Number(data['exp']+'000')

          let agora = Date.now()
          if(agora > temp){
          
            
            this.snackbar.open("seu token expirou", "X", {duration: 3000})
            this.auth.logout()
         }
        },
         (erro)=>{this.snackbar.open(erro.message || erro.msg || erro.error.message || erro.error.msg, "X", {duration: 2000})})
         this.spinner.hide()
  }

  


}
