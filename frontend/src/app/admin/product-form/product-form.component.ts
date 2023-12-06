import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComprabastosService } from '../../services/comprabastos.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent {
  private formBuilder: FormBuilder = inject(FormBuilder)
  private cbService: ComprabastosService = inject(ComprabastosService)

  productForm: FormGroup

  constructor() {
    this.productForm = this.formBuilder.group({
      name: [''],
      price: [0]
    })
  }

  handleSubmit() {
    this.cbService.saveNewProduct(this.productForm.value).subscribe(resp => {

      console.log(resp)

    })
  }
}
