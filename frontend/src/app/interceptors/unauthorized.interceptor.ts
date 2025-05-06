import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export const UnauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastService = inject(ToastService);
  
  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        router.navigate(['/login']);
        toastService.showError('A művelet elvégzéséhez bejelentkezés szükséges');
      }
      return throwError(() => err);
    })
  );
};