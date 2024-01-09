import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { IOrder, IUser } from 'src/app/interfaces';
import { ComprabastosService } from 'src/app/services/comprabastos.service';

@Component({
  selector: 'user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.sass']
})
export class UserOrdersComponent {
  private cbService = inject(ComprabastosService) 

  @Input() orders:any[] = []
  @Input() userType:string | null = null

  public showDetails = false
  public selectedOrder:IOrder | null = null
  public logged:IUser | null = this.cbService.logged()

  constructor() {
    const loggedId = localStorage.getItem('token')
    if (!this.cbService.logged() && loggedId) {
      this.cbService.getLogged(loggedId).subscribe(resp => {
        this.cbService.logged.set(resp)
        this.logged = resp
      })
    }
  }

  toggleDetails(orderId:string) {
    this.showDetails = !this.showDetails
    this.selectedOrder = this.orders.find((item:IOrder) => item._id === orderId)
  }

  handleOrderStatus(order:IOrder, status:string) {
    const foundIndex = this.orders.findIndex(item => item._id === order._id)
    this.cbService.updateOrderStatus(order._id, status)
      .subscribe(resp => {
        let ordersClone = [ ...this.orders ]
        ordersClone[foundIndex] = resp
        this.orders = ordersClone
      })
  }

}
