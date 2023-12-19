import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';
import { IUser } from 'src/app/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  private cbService = inject(ComprabastosService)
  public companies: IUser[] = []

  constructor() {
    this.cbService.getCompanies().subscribe((resp:any) => {
      this.companies = resp
    })
    let logged = this.cbService.logged()
    const loggedId = localStorage.getItem('token')
    if (!logged && loggedId) {
      this.cbService.getLogged(loggedId).subscribe((resp:any) => {
        this.cbService.logged.set(resp)
      })
    }
  }
}
