// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiKey = 'https://mlgqwfefaxkbcxuylkcg.supabase.co';

    let authReq = req;
    if (apiKey) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `apikey ${apiKey}`
        }
      });
    }

    // Passa a requisição clonada (ou original) adiante
    return next.handle(authReq);
  }
}
