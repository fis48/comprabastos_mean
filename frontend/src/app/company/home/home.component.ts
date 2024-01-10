import { Component, inject } from '@angular/core';
import { ComprabastosService } from '../../services/comprabastos.service';
import { IOrder, IProduct, IUser, Units } from 'src/app/interfaces';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartDataset } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  private cbService = inject(ComprabastosService)
  private router = inject(Router)

  public adminProducts:IProduct[] = []
  public logged: IUser | null = null
  public showCreateOrder:boolean = false
  public units = Units
  // pie chart
  public pieChartData = [{data: []}]
  public pieChartLabels:any[] = []
  public pieChartOptions: any = { 
    plugins: {
      legend: { position: 'left' } 
    }
  }


  constructor() {
    this.handleProducts()
    this.handleCompany()
  }

  handleCompany() {
    const loggedId = localStorage.getItem('token')
    if (loggedId) {
      this.cbService.getLogged(loggedId).subscribe(resp => {
        this.logged = resp
        this.handleOrders()
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

  handleOrders() {
    if (this.logged && this.logged.id) {
      this.cbService.getOrders(this.logged.id, this.logged.type)
        .subscribe((orders:any) => {
          this.handleSales(orders)
        })
    }
  }

  handleSales(orders:IOrder[]) {
    let sales:any = {}
    let pieLabels:string[][] = []
    let pieValues:[] = []

    orders.forEach((order:any) => {
      order.products.forEach((product:any) => {
        if (!sales[product.productName]) {
          sales[product.productName] = []          
        }
        sales[product.productName].push(product.total)        
      });
    });

    Object.keys(sales).forEach((key:string) => {
      // labels
      pieLabels.push([key])
      // values
      let total = sales[key].reduce((a:number, b:number) => a + b)
      pieValues.push(total as never)
    });
    this.pieChartLabels = pieLabels
    this.pieChartData[0].data = pieValues
  }

  toggleCreatingOrder(){
    this.showCreateOrder = !this.showCreateOrder
  }

  

}
