import { Component, inject } from '@angular/core';
import { IOrder } from 'src/app/interfaces';
import { ComprabastosService } from 'src/app/services/comprabastos.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent {
  private cbService = inject(ComprabastosService)

  public logged = this.cbService.logged()
  public orders:IOrder[] = []

  constructor() {
    const loggedId = localStorage.getItem('token')
    if (!this.logged && loggedId) {
      this.cbService.getLogged(loggedId).subscribe(resp => {
        this.cbService.logged.set(resp)
        this.logged = resp
        this.handleOrders()
      })
    }else {
      this.handleOrders()
    }
  }

  handleOrders() {
    if (this.logged && this.logged.id) {
      this.cbService.getOrders(this.logged.id, this.logged.type)
        .subscribe((resp:any) => {
          this.orders = resp
        })
    }
  }
}
