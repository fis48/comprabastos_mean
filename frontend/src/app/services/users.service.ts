import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { ILoginData } from '../interfaces/loginData';
import { Router } from '@angular/router';
import { ComprabastosService } from './comprabastos.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http:HttpClient = inject(HttpClient)
  private router = inject(Router)
  private cbService = inject(ComprabastosService)
  // private baseUrl = 'http://localhost:8000/api'
  // private baseUrl = 'https://comprabastos-api.onrender.com/api'
  private baseUrl = `${ environment.productionBackendUri }`


  login(loginData:ILoginData) {
    return this.http.post(`${this.baseUrl}/login`, loginData)
  }

  logout() {

    console.warn('Logout implementation pending.')

    this.cbService.logged.set(null)
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`)
  }

  updateUser(updData:any) {
    return this.http.patch(`${this.baseUrl}/user`, updData)
  }

}
