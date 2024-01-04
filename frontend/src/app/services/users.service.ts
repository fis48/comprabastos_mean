import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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
  

  login(loginData:ILoginData) {
    return this.http.post('http://localhost:8000/api/login', loginData)
  }

  logout() {

    console.warn('Logout implementation pending.')

    this.cbService.logged.set(null)
    localStorage.removeItem('token')
    this.router.navigate(['/'])
    


  }
}
