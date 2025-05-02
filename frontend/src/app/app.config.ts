import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AccessTokenInterceptor } from './interceptors/access-token.interceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
};
