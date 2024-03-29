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
  private baseUrl = `${ environment.productionBackendUri }`
  public adminProducts = signal<IProduct[]>([])
  public logged = signal<IUser | null>(null)
  public onGoingOrder = signal<any>([])
  public createdOrder = signal<any | null>(null)
  public updatingProduct = signal<IProduct | null>(null)

  getAdminProducts() {
    return this.http.get(`${this.baseUrl}/admin-products`).pipe(
      map((resp:any) => {
        const products = resp.map((product:IProduct) => {
          return this.handleProduct(product)
        })
        this.adminProducts.set(products)
        return products
      })
    )
  }

  getProduct(productId: string) {
    return this.http.get(`${this.baseUrl}/product/${productId}`)
  }

  handleProduct(product:IProduct) {
    let ap = 0
    const productClone:any = { ...product }
    productClone.prices.sort((a:any, b:any) => a.timestamp + b.timestamp )
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
    
    let status = 'same';
    if (productClone.prices[0] && productClone.prices[1]) {
      if (productClone.prices[0].value < productClone.prices[1].value) {
        status = 'down'
      }
      else if (productClone.prices[0].value > productClone.prices[1].value) {
        status = 'up'
      }        
    }
    productClone.status = status
    return productClone
  }

  saveNewProduct(insData:IProduct) {
    return this.http.post(`${this.baseUrl}/create-product`, insData)
  }

  getLogged(loggedId:string) {
    return this.http.post(`${this.baseUrl}/logged`, { loggedId }).pipe(
      tap((resp:any) => {
        this.logged.set(resp)
      })
    )
  }

  updateCompanyList(list:IUserItems[], companyId:string) {
    return this.http.patch(`${this.baseUrl}/company-list`, { companyId, list })
  }
  
  getCompanies() {
    return this.http.get(`${this.baseUrl}/companies`)
  }

  getCompany(companyId: string) {
    return this.http.get(`${this.baseUrl}/company/${companyId}`)
  }

  updateQuote(quote:IQuote) {
    return this.http.post(`${this.baseUrl}/quote`, quote)
  }
  
  getQuotes(companyId: string) {
    return this.http.get(`${this.baseUrl}/quotes/${companyId}`)
  }
  
  updatePrices(productId: string, prices: any) {
    const updData = {
      productId,
      prices
    }
    return this.http.patch(`${this.baseUrl}/product-prices`, updData)
  }

  updateGlobalPrices(updData:any) {
    return this.http.patch(`${this.baseUrl}/global-prices`, updData)
  }

  createOrder(company:IUser, offer:any) {
    return this.http.post(`${this.baseUrl}/order`, {
      company,
      offer
    })
  }

  getQuote(companyId: string, shopperId: string) {
    return this.http.get(`${this.baseUrl}/quote/${companyId}/${shopperId}`)
  }

  createUser(createData:IUser) {
    return this.http.post(`${this.baseUrl}/register`, createData)
  }

  updateProduct(updData:any) {
    return this.http.patch(`${this.baseUrl}/product`, updData)
  }

  getOrders(userId:string, userType:string | null = null) {
    return this.http.get(`${this.baseUrl}/orders/${userId}/${userType}`)
  }

  updateOrderStatus(orderId:string, status:string) {
    return this.http.patch(`${this.baseUrl}/order-status`, { orderId, status })
  }

  getVariation(productId:string) {
    return this.http.get(`${this.baseUrl}/variation/${productId}`)
  }

}
