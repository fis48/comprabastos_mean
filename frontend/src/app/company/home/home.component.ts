import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';
import { IProduct, Units } from 'src/app/interfaces';
import { Router } from '@angular/router';
import { ICompany } from '../../interfaces/company';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  private cbService = inject(ComprabastosService)
  private router = inject(Router)

  public adminProducts:IProduct[] = []
  public logged: ICompany | null = null

  public showCreateOrder:boolean = false
  public units = Units

  constructor() {
    this.handleProducts()
    this.handleCompany()
  }

  handleCompany() {
    const loggedId = localStorage.getItem('token')
    if (loggedId) {
      this.cbService.getLogged(loggedId, 'company').subscribe(resp => {
        this.logged = resp
      })
    }
    else {
      this.router.navigate(['/login'])
    }
  }

  handleProducts() {
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
