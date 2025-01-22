import { Component, ElementRef,  Input,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Contato } from 'src/app/models/contato.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-lista-telefonica',
  templateUrl: './lista-telefonica.component.html',
  styleUrls: ['./lista-telefonica.component.css', '../../app.component.css']
})
export class ListaTelefonicaComponent{

  @Input()
  lista_telefonica_DATA: Contato[] ;

 
 dataSource;
 displayedColumns: string[]
 paginatorBck: any;
 dataSourceBackup: Contato[];
 ATIVOS;
 INATIVOS;
 
 constructor(  
   private http: HttpClient,
   private router: Router,
   private snackbar: MatSnackBar,
   private spinner: NgxSpinnerService
   
   
   
   ){
  

    this.displayedColumns= ['orgao', 'setor', 'ramal', 'responsavel','localizacao'];
    
     this.spinner.show()
     this.http.get<any>(`${environment.apiUrl}ListaTelefonica`, {
    }
    )
    .subscribe(
      
      (data)=> { 
        this.dataSource = new MatTableDataSource<Contato>(data.info);
          this.lista_telefonica_DATA = data.info;
          this.dataSource.paginator = this.paginator;
          
          
        },
        (erro)=>{
          this.snackbar.open(erro.message || erro.msg || erro.error.message || erro.error.msg, "X", {duration: 3000}); 

        }
      );
      
      
      this.spinner.hide()

    }
    
    windowSize(){
      return window.screen.availWidth
    }
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('retorno') retorno: ElementRef;

    ngAfterViewInit() {
     
  }


  applyFilter(filterValue) {  
    
    
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase(); 
    
  }
  
  navigate(rota){
    this.router.navigate([rota])

  }

  
}