import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILoginData } from '../interfaces/loginData';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http:HttpClient = inject(HttpClient)
  

  login(loginData:ILoginData) {
    return this.http.post('http://localhost:8000/api/login', loginData)
  }
}
