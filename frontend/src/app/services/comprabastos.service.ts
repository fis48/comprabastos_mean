import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from "../../environments/environment.development";

import { IUserItems, IProduct, IUser } from '../interfaces';
import { map, tap } from 'rxjs';
import { IQuote } from '../interfaces/quote';

@Injectable({
  providedIn: 'root'
})
export class ComprabastosService {
  private http:HttpClient = inject(HttpClient)
  public adminProducts = signal<IProduct[]>([])
  public logged = signal<IUser | null>(null)
  public onGoingOrder = signal<any>([])
  public createdOrder = signal<any | null>(null)
  public updatingProduct = signal<IProduct | null>(null)

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
      let total = 0
      productClone.prices.forEach((item:any) => {
        total += item.value
      });
      ap = Math.ceil(total / productClone.prices.length)
    }
    productClone.avgPrice = ap
    return productClone
  }

  saveNewProduct(insData:IProduct) {
    return this.http.post(`${environment.localBackendUri}/create-product`, insData)
  }

  getLogged(loggedId:string) {
    return this.http.post(`${environment.localBackendUri}/logged`, { loggedId }).pipe(
      tap((resp:any) => {
        this.logged.set(resp)
      })
    )
  }

  updateCompanyList(list:IUserItems[], companyId:string) {
    return this.http.patch(`${environment.localBackendUri}/company-list`, { companyId, list })
  }
  
  getCompanies() {
    return this.http.get(`${environment.localBackendUri}/companies`)
  }

  getCompany(companyId: string) {
    return this.http.get(`${environment.localBackendUri}/company/${companyId}`)
  }

  updateQuote(quote:IQuote) {
    return this.http.post(`${environment.localBackendUri}/quote`, quote)
  }
  
  getQuotes(companyId: string) {
    return this.http.get(`${environment.localBackendUri}/quotes/${companyId}`)
  }
  
  updatePrices(productId: string, prices: any) {
    const updData = {
      productId,
      prices
    }
    return this.http.patch(`${environment.localBackendUri}/product-prices`, updData)
  }

  createOrder(company:IUser, offer:any) {
    return this.http.post(`${environment.localBackendUri}/order`, {
      company,
      offer
    })
  }

  getQuote(companyId: string, shopperId: string) {
    return this.http.get(`${environment.localBackendUri}/quote/${companyId}/${shopperId}`)
  }

  createUser(createData:IUser) {
    return this.http.post(`${environment.localBackendUri}/register`, createData)
  }

}
