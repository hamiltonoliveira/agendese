import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { FirebaseClienteService } from './../services/firebase-cliente.service';
import { LocalStorageService } from 'src/services/local-storage.service';

import { provideToastr, ToastrModule } from 'ngx-toastr';
import { GuidService } from 'src/services/guid.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
   ],
  providers: [FirebaseClienteService,
              LocalStorageService,
              GuidService],
  bootstrap: [AppComponent]
})
export class AppModule { }
