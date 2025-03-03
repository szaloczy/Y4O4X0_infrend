import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const authUser = localStorage.getItem('authUser') ?? '';
    request = request.clone({
        setHeaders: {
            Authorization: authUser ? `Token ${authUser}` : '',
        },
    });

    return next(request);
}