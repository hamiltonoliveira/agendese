import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-home', pathMatch: 'full' }, // Rota inicial
  { path: 'app-home', component: HomeComponent },  // Defina o componente correspondente
  { path: 'users', loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule) },
  { path: 'clientes', loadChildren: () => import('./components/clientes/clientes.module').then(m => m.ClientesModule) },
  { path: 'map', loadChildren: () => import('./components/map/map.module').then(m => m.MapModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
