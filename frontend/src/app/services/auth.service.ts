import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable } from "rxjs";

@Inject({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = 'http://localhost:3000/api/register';

    constructor(private http: HttpClient) {}

    register(userData: any): Observable<any> {
        return this.http.post(this.apiUrl, userData);
    }
} 