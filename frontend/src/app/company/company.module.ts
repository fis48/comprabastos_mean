import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from '../shared/search/search.component';
import { SharedModule } from '../shared/shared.module';
import { MyListComponent } from './my-list/my-list.component';
import { OrderComponent } from './order/order.component';
import { CreatedOrderComponent } from './created-order/created-order.component';
import { OrdersComponent } from './orders/orders.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    HomeComponent,
    MyListComponent,
    OrderComponent,
    CreatedOrderComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    NgChartsModule
  ]
})
export class CompanyModule { }
