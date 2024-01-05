import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces';
import { ComprabastosService } from 'src/app/services/comprabastos.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent {
  private cbService = inject(ComprabastosService)
  private route = inject(ActivatedRoute)

  public product:IProduct | null = null


  constructor() {
    this.route.params.subscribe((params:any) => {
      this.cbService.getProduct(params.id).subscribe((product:any) => {
        this.product = product
      })
    })
  }

  handleName(e:any) {
    const { value } = e.target
    if (this.product) {
      const updData = {
        name: value,
        productId: this.product.id
      }
      this.cbService.updateProduct(updData).subscribe((updated:any) => {
        this.cbService.getAdminProducts().subscribe(resp => {

          console.log('updated', updated)

        })
      })        
    }
  }

}
