import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
   ],
  providers: [provideNgxMask()],
})
export class ClientesModule { }
