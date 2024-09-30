import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'users', loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule) },
                        { path: 'clientes', loadChildren: () => import('./components/clientes/clientes.module').then(m => m.ClientesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
