import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';
import { IProduct, Units } from 'src/app/interfaces';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  private cbService = inject(ComprabastosService)
  public adminProducts:IProduct[] = []
  public showCreateOrder:boolean = false
  public units = Units

  constructor() {
    const adminProducts = this.cbService.adminProducts()
    if (adminProducts.length <= 0) {
      console.log('Reload products fired')
      this.cbService.getAdminProducts().subscribe((resp) => {
        this.adminProducts = resp
      })      
    }
    else {
      this.adminProducts = adminProducts
    }
  }

  toggleCreatingOrder(){
    this.showCreateOrder = !this.showCreateOrder
  }

}
