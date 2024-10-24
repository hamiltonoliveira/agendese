import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { LocalStorageService } from 'src/services/local-storage.service';

import { ToastrModule } from 'ngx-toastr';
import { GuidService } from 'src/services/guid.service';
import { HomeComponent } from './components/home/home.component';

import { ApiService } from './services/api.service';

import { AuthInterceptor } from './../../auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
   ],
  providers: [LocalStorageService,
              GuidService,
              ApiService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
              }
             ],

  bootstrap: [AppComponent]
})
export class AppModule { }
