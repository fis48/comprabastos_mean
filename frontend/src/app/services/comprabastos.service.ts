import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from "../../environments/environment.development";

import { IProduct } from '../interfaces';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprabastosService {
  private http:HttpClient = inject(HttpClient)
  public adminProducts = signal<IProduct[]>([])

  getAdminProducts() {
    return this.http.get(`${environment.localBackendUri}/admin-products`).pipe(
      tap((resp:any) => {
        this.adminProducts.set(resp)
      })
    )
  }

  saveNewProduct(insData:IProduct) {
    return this.http.post(`${environment.localBackendUri}/create-product`, insData)
  }
  
}
