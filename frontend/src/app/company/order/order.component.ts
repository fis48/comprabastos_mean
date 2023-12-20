import { Component, inject } from '@angular/core';
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

  public rawQuotes:IQuote[] = []
  public company = this.cbService.logged()
  public order = this.cbService.onGoingOrder()
  public quotes:any[] = [] 
  public showDetails:boolean = false

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
      let detail = {
        productId: shProduct.productId,
        productName: shProduct.productName,
        price: shProduct.value,
        quant: Number(item.quant),
        total: shProduct.value * item.quant
      }
      details = [ ...details, detail ]
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

}
