import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';
import { IUserItems, IProduct, IUser } from 'src/app/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.sass']
})
export class MyListComponent {
  private cbService = inject(ComprabastosService)
  private router = inject(Router)
  private elemRef = inject(ElementRef)
  
  public adminProducts:IProduct[] = []
  public company: IUser | null = null
  public creatingOrder: boolean = false
  public orderList: {product: string, quant: number}[] = []
  public onGoing:any = this.cbService.onGoingOrder()

  constructor() {
    if (this.onGoing.length > 0) {
      this.creatingOrder = true
    }

    // admin products
    const adminProducts = this.cbService.adminProducts()
    if (adminProducts.length <= 0) {
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
      this.cbService.getLogged(loggedId).subscribe((resp) => {
        this.cbService.logged.set(resp)
        this.company = resp
      })
    }
    else {
      this.company = logged
    }
  }

  handleInputValues() {
    this.onGoing.forEach((item:any) => {
      const inputFound = document.getElementById(item.product.id)
      inputFound?.setAttribute('value', item.quant)
    });
  }

  ngAfterViewInit() {
    this.handleInputValues()
  }

  addToList(selected:IProduct) {
    let list:IUserItems[] = []
    if (this.company && this.company.id && selected.id ) {
      if (this.company.products) {
        list = this.company.products
      }
      const exist = list.some(item => item.id === selected.id)
      if (!exist) {
        list = [ ...list, { id: selected.id, name: selected.name } ]
        this.cbService.updateCompanyList(list, this.company.id)
        .subscribe(resp => {
          this.company = resp as IUser
        })
      }
      else {
        console.log('err:: Product already added.')
      }
    }
  }

  removeFromList(selected:IUserItems) {
    if (this.company && this.company.id && this.company.products) {
      const newList = this.company.products.filter(item => item.id !== selected.id)
      this.cbService.updateCompanyList(newList, this.company.id)
      // .subscribe((resp: any) => {
      //   this.company = resp
      // })
    }
  }

  toggleCreatingOrder() {
    this.creatingOrder = !this.creatingOrder
  }

  handleItemQuant(e:any, product:any) {
    const { value } = e.target
    const newItem = {
      product,
      quant: value
    }
    if (this.onGoing.length > 0) {
      this.orderList = this.onGoing
    }
    
    if (this.orderList.length === 0) {
      this.orderList = [ ...this.orderList, newItem ]
    }
    else {
      const foundIndex = this.orderList.findIndex((item:any) => item.product.id === product.id)
      if (foundIndex === -1) {
        this.orderList = [ ...this.orderList, newItem ]        
      }
      else {
        let updItem = this.orderList[foundIndex]
        updItem.quant = value
        this.orderList[foundIndex] = updItem            
      }
    }
  }

  sendOrder() {
    if (this.orderList.length < this.onGoing.length) {
      this.orderList = this.onGoing
    }
    this.cbService.onGoingOrder.set(this.orderList)
    this.router.navigate(['/company/order'])
  }
}
