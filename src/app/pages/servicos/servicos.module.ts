import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationService } from '../../_services/authentication.service';
import {AngularMaterialModule} from '../../angular-material.module';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthGuard } from '../../_services/authguard';
import { RouterModule } from '@angular/router';
import { HttpSInterceptor } from 'src/app/_services/HttpSInterceptor.service';
import { ErrorInterceptor } from 'src/app/_services/errorinterceptor';
import { ValidadorComponent } from 'src/app/_services/validators/personal.validators';
import { FuncoesService } from './funcoes.service';
import { PhonePipe } from './phone.pipe';
import { CpfPipe } from './cpf.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [NavbarComponent, ValidadorComponent, PhonePipe, CpfPipe],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule, ReactiveFormsModule, RouterModule,
    MatDialogModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpSInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    FuncoesService,
    provideNgxMask(),
    
  
      
  
  ]
,
  exports: [ NavbarComponent, ValidadorComponent, PhonePipe, CpfPipe ]
})
export class ServicosModule { }
