import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  private cbService = inject(ComprabastosService)

  constructor() {
    this.cbService.getAdminProducts().subscribe(() => {

      console.log(this.cbService.adminProducts())

    })





  }

}
