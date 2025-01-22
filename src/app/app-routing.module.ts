import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './_services/authguard';
import { ResetComponent } from './pages/reset/reset.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';

const routes: Routes = [
  {path: "login" , component: LoginComponent },
  {path: "reset" , component: ResetComponent },
  {path: "recovery/:a" , component: RecoveryComponent },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  
  
  {path: '**', redirectTo: ""},

 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
