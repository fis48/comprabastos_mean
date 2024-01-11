import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { IProduct } from 'src/app/interfaces';
import { ComprabastosService } from 'src/app/services/comprabastos.service';

@Component({
  selector: 'app-variation',
  templateUrl: './variation.component.html',
  styleUrls: ['./variation.component.sass']
})
export class VariationComponent {
  private cbService = inject(ComprabastosService)
  private datePipe = inject(DatePipe)

  public adminProducts:IProduct[] = []
  public selected:IProduct | null = null
  public chartData: ChartConfiguration<'line'>['data'] = {
    datasets: [
      {
        data: [10, 30, 20],
        label: 'Variation label',
        tension: 0.5
      }
    ],
    labels: ['Enero', 'Febrero', 'Marzo']
  }

  constructor() {
    this.handleProducts()
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

  handleSelected(selected:any) {
    this.selected = selected
    this.cbService.getVariation(selected.id).subscribe((result:any) => {
      const values = result.map((item:any) => {
        return item.value
      })
      const labels  = result.map((item:any) => {
        const date = new Date(item.timestamp)
        return this.datePipe.transform(date, 'MMM-dd')
      })
      this.chartData.datasets[0].data = values
      this.chartData.datasets[0].label = `${selected.name}`
      this.chartData.labels = labels
    })
  }
}
