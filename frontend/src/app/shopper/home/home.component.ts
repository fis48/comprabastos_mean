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

  constructor() {
    this.cbService.getCompanies().subscribe((resp:any) => {
      this.companies = resp
    })
    this.logged = this.cbService.logged()
    const loggedId = localStorage.getItem('token')
    if (!this.logged && loggedId) {

      console.log('hola')

      this.cbService.getLogged(loggedId).subscribe((resp:any) => {
        this.cbService.logged.set(resp)
        this.logged = resp
        this.cbService.getOrders(resp.id, resp.type).subscribe((result:any) => {
          this.orders = result

          console.log('orders', result)

        })
      })
    }
    else if(this.logged) {
      this.cbService.getOrders(this.logged.id, this.logged.type)
        .subscribe((resp:any) => {
          this.orders = resp
          
          console.log(resp)

        })
    }
  }
}
