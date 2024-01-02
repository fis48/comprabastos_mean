import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ComprabastosService } from 'src/app/services/comprabastos.service';

@Component({
  selector: 'app-created-order',
  templateUrl: './created-order.component.html',
  styleUrls: ['./created-order.component.sass']
})
export class CreatedOrderComponent {
  private cbService = inject(ComprabastosService)
  private router = inject(Router)

  public order:any | null = null


  constructor() {
    this.order = this.cbService.createdOrder()
    if (!this.order) {
      this.router.navigate(['/company/list'])
    }

    this.cbService.onGoingOrder.set(null)
    // this.cbService.createdOrder.set(null)

    console.log('created order:', this.order)

  }

}
