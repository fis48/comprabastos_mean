import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';
import { IProduct } from 'src/app/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent {
  private cbService = inject(ComprabastosService)
  private router = inject(Router)

  adminProducts:IProduct[] = []
  showForm:boolean = false

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

  toggleForm() {
    this.showForm = !this.showForm
  }

  handleUpdatingProduct(updProduct:IProduct) {
    this.cbService.updatingProduct.set(updProduct)
    this.router.navigate(['/admin/product'])
  }
}
