import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';
import { ActivatedRoute } from '@angular/router';
import { IUser, IUserItems } from 'src/app/interfaces';
import { IQuoteItem } from 'src/app/interfaces/quoteItem';
import { IQuote } from 'src/app/interfaces/quote';


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.sass']
})
export class QuoteComponent {
  private cbService = inject(ComprabastosService)
  private route = inject(ActivatedRoute)

  public company:IUser | null = null
  public shopper:IUser | null = null
  public qPrices:IQuoteItem[] = []
  public validData:boolean = false
  public dueTimestamp:number | null = null

  constructor() {
    const logged = this.cbService.logged()
    this.route.params.subscribe(params => {
      this.cbService.getCompany(params['companyId'])
        .subscribe(resp => {
          this.company = resp as IUser
          this.shopper = this.cbService.logged()
          if (!this.shopper) {
            const loggedId = localStorage.getItem('token')
            if (loggedId) {
              this.cbService.getLogged(loggedId).subscribe(result => {
                this.shopper = result
              })              
            }
          }
        })
    })
  }

  handleQuote(e:any, product:any) {
    const { value } = e.target
    let item:any = {
      productId: product.id,
      productName: product.name,
      value: Number(value)
    }
    this.qPrices = [ ...this.qPrices, item ]

    if (this.company && this.company.products) {
      const productsLen = this.company.products.length
      if (this.qPrices.length === productsLen) {
        this.validData = true
      }
      else {
        this.validData = false
      }
    }
  }

  handleDate(e:any) {
    const { value } = e.target
    const timestamp = new Date(value).getTime()
    this.dueTimestamp = timestamp
  }

  saveQuote() {

    if (this.shopper && this.shopper.id && this.company && this.company.id
        && this.dueTimestamp) {
      const quote:IQuote = {
        shopperId: this.shopper.id,
        shopperName: this.shopper.name,
        companyId: this.company.id,
        products: this.qPrices,
        dueDate: this.dueTimestamp
      }
      this.cbService.updateQuote(quote)
      .subscribe((result) => {

        console.log(result)

      })        
    }
  }

}
