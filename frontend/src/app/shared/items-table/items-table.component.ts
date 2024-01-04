import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IProduct } from 'src/app/interfaces';
import { ComprabastosService } from 'src/app/services/comprabastos.service';
// import { } from "@angular/material/icon/";

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.sass']
})
export class ItemsTableComponent {
  @Input() items:IProduct[] = []
  @Input() showDates:boolean = false
  @Output() sendSelected = new EventEmitter()

  private cbService = inject(ComprabastosService)
  public logged = this.cbService.logged()

  constructor() {
    const loggedId = localStorage.getItem('token')
    if (!this.logged && loggedId) {
      this.cbService.getLogged(loggedId).subscribe(logged => {
        this.logged = logged
      })
    }
  }

  handleSelected(selected: IProduct) {
    this.sendSelected.emit(selected)
  }


}
