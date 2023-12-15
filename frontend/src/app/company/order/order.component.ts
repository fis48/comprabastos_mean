import { Component, inject } from '@angular/core';
import { ComprabastosService } from 'src/app/services/comprabastos.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent {
  private cbService = inject(ComprabastosService)

  constructor() {

    console.log(this.cbService.onGoingOrder())

  }

}
