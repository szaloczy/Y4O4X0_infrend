import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  router = inject(Router);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.authService.removeToken();
          this.router.navigateByUrl('/login');
        }
        throw err;
      })
    );
  }
}
