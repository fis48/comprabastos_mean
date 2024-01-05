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
  public orders:IOrder[] | null = null

  constructor() {
    const loggedId = localStorage.getItem('token')
    if (!this.logged && loggedId) {
      this.cbService.getLogged(loggedId).subscribe(resp => {
        this.cbService.logged.set(resp)
        this.logged = resp
        this.cbService.getOrders(resp.id, 'admin').subscribe((orders:any) => {
          this.orders = orders

          console.log(this.orders)
        })
      })
    }
    else if (this.logged && this.logged.id) {
      this.cbService.getOrders(this.logged.id, 'admin').subscribe((orders:any) => {
        this.orders = orders
      })
    }
  }
}
