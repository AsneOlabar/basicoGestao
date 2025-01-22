import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AuthGuard } from 'src/app/_services/authguard';
import { ListaTelefonicaComponent } from '../lista-telefonica/lista-telefonica.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ServicosModule } from '../servicos/servicos.module';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecoveryComponent } from '../recovery/recovery.component';




@NgModule({
  declarations: [HomeComponent, ListaTelefonicaComponent, RecoveryComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    ServicosModule,
    RouterModule,
    NgxSpinnerModule
    
  ],
  exports:[ListaTelefonicaComponent],
  providers: [
    AuthenticationService, AuthGuard,
    MatDialog, 
		
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class HomeModule { }
