import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly apiUrl = 'http://localhost:3000/api';
    currentUserSig = signal<any | undefined | null>(undefined);

    private usernameSubject = new BehaviorSubject<string | null>(null);
    username$ = this.usernameSubject.asObservable();

    constructor(private http: HttpClient) {}

    getUser() {
        return this.http.get<{user: any}>(this.apiUrl + "/user");
    }

    register(userData: any): Observable<any> {
        return this.http.post(this.apiUrl + "/register", userData);
    }

    login(data: any): Observable<any> {
        return this.http.post<{token: string, username: string}>(this.apiUrl + "/login", data).
            pipe(tap((result) => {
                localStorage.setItem('token', result.token);
                localStorage.setItem('username', result.username);
                this.usernameSubject.next(result.username);
            }));
    }

    logout(): void {
        localStorage.removeItem('token')
        localStorage.removeItem('username');
        this.usernameSubject.next(null);
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
} 