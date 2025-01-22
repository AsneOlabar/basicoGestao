import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../_services/authguard';
import { ListaTelefonicaComponent } from '../lista-telefonica/lista-telefonica.component';


const routes: Routes = [
  {path: "" , component: HomeComponent, 
  children: [  
    { path: '',redirectTo: "telefones" , pathMatch: "full" }, 
    { path: 'telefones', component: ListaTelefonicaComponent }, 

  ]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
