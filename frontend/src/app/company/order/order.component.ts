import { Component, inject } from '@angular/core';
import { IQuote } from 'src/app/interfaces/quote';
import { ComprabastosService } from 'src/app/services/comprabastos.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent {
  private cbService = inject(ComprabastosService)

  public quotes:IQuote[] = []
  public company = this.cbService.logged()
  public order = this.cbService.onGoingOrder()

  constructor() {
    this.getQuotes()

  }

  getQuotes() {

    console.log('company:', this.company)
    console.log('order:', this.order)

    if (this.company && this.company.id) {
      this.cbService.getQuotes(this.company.id).subscribe(resp => {

        console.log('resp', resp)

      })
    }

  }


}
