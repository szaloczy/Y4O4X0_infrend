import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface User {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: "root"
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<{data: User[]}> {
    return this.http.get<{data: User[]}>(this.apiUrl);
  }
}