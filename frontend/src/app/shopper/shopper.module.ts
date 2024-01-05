import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopperRoutingModule } from './shopper-routing.module';
import { HomeComponent } from './home/home.component';
import { QuoteComponent } from './quote/quote.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    QuoteComponent
  ],
  imports: [
    CommonModule,
    ShopperRoutingModule,
    SharedModule
  ]
})
export class ShopperModule { }
