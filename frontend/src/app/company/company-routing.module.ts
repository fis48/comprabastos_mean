import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyListComponent } from './my-list/my-list.component';
import { OrderComponent } from './order/order.component';
import { CreatedOrderComponent } from './created-order/created-order.component';
import { OrdersComponent } from './orders/orders.component';
import { VariationComponent } from './variation/variation.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'list',
    component: MyListComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'created-order',
    component: CreatedOrderComponent
  },
  {
    path: 'variation',
    component: VariationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
