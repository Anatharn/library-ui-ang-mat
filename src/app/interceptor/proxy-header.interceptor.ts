import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Add the x-forwarded-* header to allow the back-end to send the correct links
 */
@Injectable()
export class ProxyHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const proxyRequest = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
            .set('X-Forwarded-Host', window.location.hostname)
            .set('X-Forwarded-Port', window.location.port)
    });

    return next.handle(proxyRequest);
  }
}
