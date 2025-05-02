import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  authService = inject(AuthService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    const transformedRequest = request.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });

    return next.handle(transformedRequest);
  }
}
