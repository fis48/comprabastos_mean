import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.sass']
})
export class QuoteComponent {
  private cbService = inject(ComprabastosService)

  constructor() {

    console.log( this.cbService.logged() )

  }

}
