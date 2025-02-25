import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../types";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/'; 

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<{data: User[]}> {
    return this.http.get<{data: User[]}>(this.apiUrl);
  }
}