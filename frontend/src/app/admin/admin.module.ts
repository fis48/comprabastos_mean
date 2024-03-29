import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { PricesComponent } from './prices/prices.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductFormComponent,
    ProductComponent,
    PricesComponent,
    OrdersComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
