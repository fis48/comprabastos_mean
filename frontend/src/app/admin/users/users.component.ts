import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from 'src/app/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
  private usersService = inject(UsersService)
  private formBuilder = inject(FormBuilder)
  public users:any = {}
  public updatingUser:IUser | null = null
  public userForm: FormGroup;

  constructor() {
    let users:any = {
      shoppers: [],
      companies: []
    }
    this.usersService.getUsers().subscribe((resp:any) => {
      resp.forEach((user:IUser) => {
        if(user.type === 'company') {
          users.companies.push(user)
        }
        else if (user.type === 'shopper') {
          users.shoppers.push(user)
        }
      })
      this.users = users
    })
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      address: [''],
      phone: [''],
      whatsapp: [''],
      type: [''],
      deliveryTerms: [''],
      paymentTerms: [''],
      status: [''],
    })
  }

  handleUserUpdate() {

    console.log(this.userForm.value)

  }

  handleUserStatus(status:string) {
    if (this.updatingUser) {
      this.usersService.updateUser({ status, userId: this.updatingUser.id })
        .subscribe((result:any) => {
          this.updatingUser = result
        })        
    }
  }

  toggleUpdatingUser(updUser:IUser) {
    if (this.updatingUser === null) {
      this.updatingUser = updUser
      let updValues:any = { ...this.updatingUser as any }
      delete updValues.id
      delete updValues.products
      delete updValues.companies
      this.userForm.setValue(updValues)
    }
    else {
      this.updatingUser = null
    }
  }

  cancelUpdating() {
    this.updatingUser = null
  }

}
