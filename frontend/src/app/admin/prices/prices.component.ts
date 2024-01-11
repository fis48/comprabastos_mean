import { Component, inject } from '@angular/core';
import { timestamp } from 'rxjs';
import { IProduct } from 'src/app/interfaces';
import { ComprabastosService } from 'src/app/services/comprabastos.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.sass']
})
export class PricesComponent {
  private cbService = inject(ComprabastosService)

  public adminProducts = this.cbService.adminProducts()
  public pricesList:IProduct[] = []
  public updatingProduct:IProduct | null = null

  constructor() {
    if (this.adminProducts.length === 0) {
      this.cbService.getAdminProducts().subscribe(products => {
        this.cbService.adminProducts.set(products)
        this.pricesList = products
      })
    }
    else {
      this.pricesList = this.adminProducts
    }
  }  

  setNewPrice(product:IProduct) {
    this.updatingProduct = product
  }

  hanldeNewPrice(e: any) {
    if (this.updatingProduct && this.updatingProduct.id) {
      const newPrice = e.target.value
      let prices = this.updatingProduct.prices
      let newPrices = [ ...prices ]
      let newItem = {
        timestamp: new Date().getTime(),
        value: Number(newPrice)
      }
      if (prices.length < 3) {
        newPrices = [ ...newPrices, newItem ]
      }
      else {
        const ordered = newPrices.sort((a, b) => a.timestamp - b.timestamp)
        const slice = ordered.slice(1, ordered.length)
        newPrices = [ ...slice, newItem ]
      }
      const sum:any = newPrices.reduce((a:any, b:any) => { 
        return a.value + b.value 
      })
      const newAvg = sum / newPrices.length

      console.log('prod', this.updatingProduct)
      console.log('new', newItem)

      this.cbService.updatePrices(this.updatingProduct.id, newPrices)
        .subscribe(resp => {
          this.cbService.getAdminProducts().subscribe(prods => {
            this.pricesList = prods
          })
        })

      const newGlobalPrice = {
        timestamp: newItem.timestamp,
        value: newItem.value,
        productId: this.updatingProduct.id,
        productName: this.updatingProduct.name
      }
      this.cbService.updateGlobalPrices(newGlobalPrice).subscribe(resp => {

        console.log('new global price', resp)

      })
        
    }
  }

  cancelPriceUpdate() {
    this.updatingProduct = null
  }

}
