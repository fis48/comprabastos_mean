import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from "../../environments/environment.development";

import { IProduct } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ComprabastosService {
  private http:HttpClient = inject(HttpClient)

  getAdminProducts() {
    return this.http.get(`${environment.localBackendUri}/admin-products`)
  }

  saveNewProduct(insData:IProduct) {
    return this.http.post(`${environment.localBackendUri}/create-product`, insData)
  }
  
}
