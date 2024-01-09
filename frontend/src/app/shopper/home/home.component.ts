import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';
import { IOrder, IUser } from 'src/app/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  private cbService = inject(ComprabastosService)
  public companies: IUser[] = []
  public logged:any = null 
  public orders:IOrder[] = []
  public showCompanies:boolean = false
  public showOrders:boolean = true

  constructor() {
    this.cbService.getCompanies().subscribe((resp:any) => {
      this.companies = resp
    })
    this.logged = this.cbService.logged()
    const loggedId = localStorage.getItem('token')
    if (!this.logged && loggedId) {
      this.cbService.getLogged(loggedId).subscribe((resp:any) => {
        this.cbService.logged.set(resp)
        this.logged = resp
        this.cbService.getOrders(resp.id, resp.type).subscribe((result:any) => {
          this.orders = result
        })
      })
    }
    else if(this.logged) {
      this.cbService.getOrders(this.logged.id, this.logged.type)
        .subscribe((resp:any) => {
          this.orders = resp
        })
    }
  }

  toggleData(type:string) {
    if (type === 'companies') {
      this.showCompanies = !this.showCompanies
      if (this.showCompanies) {
        this.showOrders = false
      }
    }
    else if (type === 'orders') {
      this.showOrders = !this.showOrders
      if (this.showOrders) {
        this.showCompanies = false
      }
    }
  }
}
