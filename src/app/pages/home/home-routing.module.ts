import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../_services/authguard';
import { ListaTelefonicaComponent } from '../lista-telefonica/lista-telefonica.component';
import { FichaCadastralComponent } from './ficha-cadastral/ficha-cadastral.component';


const routes: Routes = [
  {path: "" , component: HomeComponent, 
  children: [  
    { path: '',redirectTo: "telefones" , pathMatch: "full" }, 
    { path: 'telefones', component: ListaTelefonicaComponent }, 
    { path: 'cadastro', component: FichaCadastralComponent }, 

  ]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
