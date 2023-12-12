import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from "../../environments/environment.development";

import { ICompany, ICompanyProduct, IProduct } from '../interfaces';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprabastosService {
  private http:HttpClient = inject(HttpClient)
  public adminProducts = signal<IProduct[]>([])
  public logged = signal<ICompany | null>(null)

  getAdminProducts() {
    return this.http.get(`${environment.localBackendUri}/admin-products`).pipe(
      map((resp:any) => {
        const products = resp.map((product:IProduct) => {
          return this.handleProduct(product)
        })
        this.adminProducts.set(products)
        return products
      })
    )
  }

  handleProduct(product:IProduct) {
    let ap = 0
    const productClone:any = { ...product }
    if (productClone.prices.length === 1) {
      ap = product.prices[0].value
    }
    else {
      ap = productClone.prices.reduce((a:any, b: any) => { 
        return (a.value + b.value) / product.prices.length 
      })
    }
    productClone.avgPrice = ap
    return productClone
  }

  saveNewProduct(insData:IProduct) {
    return this.http.post(`${environment.localBackendUri}/create-product`, insData)
  }

  getLogged(loggedId:string, type:string) {
    return this.http.post(`${environment.localBackendUri}/logged-${type}`, { loggedId }).pipe(
      tap((resp:any) => {
        this.logged.set(resp)
      })
    )
  }

  updateCompanyList(list:ICompanyProduct[], companyId:string) {
    return this.http.patch(`${environment.localBackendUri}/company-list`, { companyId, list })
  }
  
  
}
