import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from 'src/app/interfaces';
import { ComprabastosService } from 'src/app/services/comprabastos.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder)
  private cbService = inject(ComprabastosService)

  public registerForm: FormGroup;
  public creatingType:string = ""
  public formSent:boolean = false

  constructor() {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      address: [''],
      phone: [''],
      whatsapp: [''],
      type: [''],
      deliveryTerms: [''],
      paymentTerms: [''],
    })
  }

  handleTypes(e:any) {
    this.creatingType = e.target.value
  }

  handleRegister(){
    const formValue = this.registerForm.value
    let newUser:IUser = { ...formValue }
    this.cbService.createUser(newUser).subscribe(created => {
      this.formSent = true
      console.log(created)
    })
  }
}
