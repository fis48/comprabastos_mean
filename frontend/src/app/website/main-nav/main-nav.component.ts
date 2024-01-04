import { Component, inject } from '@angular/core';
import { ComprabastosService } from 'src/app/services/comprabastos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'website-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.sass']
})
export class MainNavComponent {
  private cbService = inject(ComprabastosService)
  private uService = inject(UsersService)

  public logged = this.cbService.logged()

  constructor() {
    const loggedId = localStorage.getItem('token')
    if (!this.logged && loggedId) {
      this.cbService.getLogged(loggedId).subscribe(logged => {
        this.logged = logged
      })
    }
  }

  handleLogout() {
    this.uService.logout()
    this.logged = null
  }

}
