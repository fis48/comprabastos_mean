import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IQuote } from 'src/app/interfaces/quote';
import { IQuoteCard } from 'src/app/interfaces/quoteCard';
import { IQuoteItem } from 'src/app/interfaces/quoteItem';
import { ComprabastosService } from 'src/app/services/comprabastos.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent {
  private cbService = inject(ComprabastosService)
  private router = inject(Router)

  public rawQuotes:IQuote[] = []
  public company = this.cbService.logged()
  public order = this.cbService.onGoingOrder()
  public quotes:any[] = [] 
  public showDetails:boolean = true

  constructor() {
    this.getQuotes()
  }

  toggleDetails() {
    this.showDetails = !this.showDetails
  }

  getQuotes() {
    if (this.company && this.company.id) {
      this.cbService.getQuotes(this.company.id).subscribe((resp:any) => {
        this.rawQuotes = resp
        this.handleQuotes(this.rawQuotes)
      })
    }
    else {
      this.router.navigate(['/company/list'])
    }
  }

  handleQuotes(rawQuotes:IQuote[]) {
    const quotes = rawQuotes.map((rQuote) => {
      const details = this.getShopperDetail(rQuote.products)
      const totals = this.getTotals(details)     
      const quoteCard:IQuoteCard = {
        shopperId: rQuote.shopperId,
        shopperName: rQuote.shopperName,
        details,
        totals
      }
      return quoteCard
    })
    this.quotes = quotes
  }

  getShopperDetail(shopperPrices:any[]) {
    let details:any[] = []
    this.order.forEach((item:any) => {
      const shProduct = shopperPrices.find((x:any) => x.productId === item.product.id)
      if (shProduct) {
        let detail = {
          productId: shProduct.productId,
          productName: shProduct.productName,
          price: shProduct.value,
          quant: Number(item.quant),
          total: shProduct.value * item.quant
        }
        details = [ ...details, detail ]          
      }
    });
    return details
  }

  getTotals(details:any) {
    let totalPrice = 0
    details.forEach((item:any) => {
      totalPrice += item.total
    });
    let totals = {
      products: details.length,
      price: totalPrice
    }
    return totals
  }

  handleOrder(selectedOffer: any) {
    if (this.company) {
      this.cbService.createOrder(this.company, selectedOffer)
      .subscribe(created => {
        this.cbService.createdOrder.set(created)
        this.router.navigate(['/company/created-order'])
      })      
    }

  }


}
