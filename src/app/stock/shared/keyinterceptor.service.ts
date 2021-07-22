import { BCBody } from './../Model/BCBody';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class KeyInterceptorService implements HttpInterceptor {
   intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {

      return next.handle(req);
   }
}
