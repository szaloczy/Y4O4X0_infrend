import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = 'http://localhost:3000/api/register';

    constructor(private http: HttpClient) {}

    register(userData: any): Observable<any> {
        return this.http.post(this.apiUrl, userData);
    }

    login(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data).
            pipe(tap((result) => {
                localStorage.setItem('authUser', JSON.stringify(result));
            }))
    }

    logout(): void {
        localStorage.removeItem('authUser')
    }

    isLoggedIn() {
        return localStorage.getItem('authUser') !== null;
    }
} 