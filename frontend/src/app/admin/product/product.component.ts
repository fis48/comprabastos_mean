import { Component, inject } from '@angular/core';
import { ComprabastosService } from 'src/app/services/comprabastos.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent {
  private cbService = inject(ComprabastosService)


  constructor() {

    console.log('updating product', this.cbService.updatingProduct())

  }

}
