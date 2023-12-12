import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from '../shared/search/search.component';
import { SharedModule } from '../shared/shared.module';
import { MyListComponent } from './my-list/my-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    MyListComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule
  ]
})
export class CompanyModule { }
