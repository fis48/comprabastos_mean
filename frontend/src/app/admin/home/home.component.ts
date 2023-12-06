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
  private cbservice:ComprabastosService = inject(ComprabastosService)
  
  adminProducts:IProduct[] = []
  showForm:boolean = true

  constructor() {
    
    
    this.cbservice.getAdminProducts().subscribe((products:any) => {
      this.adminProducts = products
      
      console.log(products)

    })
  }
}
