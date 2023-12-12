import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopperRoutingModule } from './shopper-routing.module';
import { HomeComponent } from './home/home.component';
import { QuoteComponent } from './quote/quote.component';


@NgModule({
  declarations: [
    HomeComponent,
    QuoteComponent
  ],
  imports: [
    CommonModule,
    ShopperRoutingModule
  ]
})
export class ShopperModule { }
