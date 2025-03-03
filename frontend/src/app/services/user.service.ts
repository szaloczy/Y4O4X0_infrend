import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserInterface } from "../types";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/'; 

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<{data: UserInterface[]}> {
    return this.http.get<{data: UserInterface[]}>(this.apiUrl);
  }
}