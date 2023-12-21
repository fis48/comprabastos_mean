import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';
import { IProduct } from 'src/app/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  private cbService = inject(ComprabastosService)
  public adminProducts:IProduct[] = []

  constructor() {
    this.cbService.getAdminProducts().subscribe(() => {
      this.adminProducts = this.cbService.adminProducts()

      console.log(this.adminProducts)
    })
  }

}
