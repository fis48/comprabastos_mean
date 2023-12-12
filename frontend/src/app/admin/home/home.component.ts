import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';
import { IProduct } from 'src/app/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent {
  private cbService:ComprabastosService = inject(ComprabastosService)
  
  adminProducts:IProduct[] = []
  showForm:boolean = true

  constructor() {
    const adminProducts = this.cbService.adminProducts()
    if (adminProducts.length <= 0) {
      console.log('Reload products fired')
      this.cbService.getAdminProducts().subscribe((resp) => {
        this.adminProducts = resp

        console.log(this.adminProducts)
      })      
    }
    else {
      this.adminProducts = adminProducts
    }
  }
}
