import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';
import { ICompany, ICompanyProduct, IProduct } from 'src/app/interfaces';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.sass']
})
export class MyListComponent {
  private cbService = inject(ComprabastosService)
  
  public adminProducts:IProduct[] = []
  public company: ICompany | null = null
  public creatingOrder: boolean = false
  public orderList: IProduct[] = []

  constructor() {
    // admin products
    const adminProducts = this.cbService.adminProducts()
    if (adminProducts.length <= 0) {
      console.log('Reload products fired')
      this.cbService.getAdminProducts().subscribe((resp) => {
        this.adminProducts = resp
        this.cbService.adminProducts.set(resp)
      })      
    }
    else {
      this.adminProducts = adminProducts
    }

    // company
    const logged = this.cbService.logged()
    const loggedId = localStorage.getItem('token')
    if (!logged && loggedId) {
      this.cbService.getLogged(loggedId, 'company').subscribe((resp) => {
        this.cbService.logged.set(resp)
        this.company = resp
      })
    }
    else {
      this.company = logged
    }
  }

  addToList(selected:IProduct) {
    if (this.company && this.company.id && selected.id ) {
      let list:ICompanyProduct[] = this.company.products
      const exist = list.some(item => item.id === selected.id)

      if (!exist) {
        list = [ ...list, { id: selected.id, name: selected.name } ]
        this.cbService.updateCompanyList(list, this.company.id).subscribe(resp => {
          this.company = resp as ICompany
        })
      }
      else {
        console.log('err:: Product already added.')
      }
    }
  }

  removeFromList(selected:ICompanyProduct) {
    if (this.company && this.company.id) {
      const newList = this.company.products.filter(item => item.id !== selected.id)
      this.cbService.updateCompanyList(newList, this.company.id).subscribe((resp: any) => {
        this.company = resp
      })
    }
  }

  toggleCreatingOrder() {
    this.creatingOrder = !this.creatingOrder
  }

  handleOrderList(e: any, product:any) {
    const { checked } = e.target
    if (checked) {
      this.orderList = [ ...this.orderList, product ]
    }
    else {
      this.orderList = this.orderList.filter(item => item.id !== product.id)
    }
  }

  handleItemQuant(e:any, product:any) {
    const { value } = e.target
    this.orderList.map((item, i) => {
      if (item.id === product.id) {
        let it:any = { ...item }
        it = { ...it, quant: value }
        this.orderList[i] = it
      }
    })

    console.warn('Order handling :)', this.orderList)

  }
}
