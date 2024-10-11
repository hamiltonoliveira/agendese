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
              LocalStorageService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
