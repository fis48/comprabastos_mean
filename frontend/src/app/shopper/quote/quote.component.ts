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
  public actualQuote:any = null
  public actualDueDate: string | null = null

  constructor() {
    const logged = this.cbService.logged()
    this.route.params.subscribe(params => {
      this.cbService.getCompany(params['companyId'])
        .subscribe(resp => {
          this.company = resp as IUser
          this.shopper = this.cbService.logged()
          let loggedId;
          if (!this.shopper) {
            loggedId = localStorage.getItem('token')
            if (loggedId) {
              this.cbService.getLogged(loggedId).subscribe(result => {
                this.shopper = result
              })              
            }
          }
          this.existingQuote()
        })
    })
  }

  existingQuote() {
    if (this.company && this.company.id && this.shopper && this.shopper.id) {
      this.cbService.getQuote(this.company?.id, this.shopper.id)
      .subscribe((resp:any) => {
        if (resp) {
          this.actualQuote = resp
          const date = resp.dueDate.split('T')
          this.actualDueDate = date[0]
          this.qPrices = resp.products
          this.dueTimestamp = new Date(this.actualDueDate!).getTime()
        }
        this.handleValidData()
      })        
    }
  }

  handleQuote(e:any, product:any) {
    const { value } = e.target
    let item:any = {
      productId: product.id,
      productName: product.name,
      value: Number(value)
    }
    const foundIndex = this.priceExists(product)
    if (foundIndex === -1) {
      this.qPrices = [ ...this.qPrices, item ]    
    }
    else {
      item.value = Number(value)
      this.qPrices[foundIndex] = item
    }
    this.handleValidData()
  }

  handleValidData() {
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

  priceExists(product:any) {
    const foundIndex = this.qPrices.findIndex((item:any) => item.productId === product.id)
    return foundIndex
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
