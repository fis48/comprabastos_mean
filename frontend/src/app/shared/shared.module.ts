import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { TopComponent } from './top/top.component';
import { ItemsTableComponent } from './items-table/items-table.component';



@NgModule({
  declarations: [
    SearchComponent,
    TopComponent,
    ItemsTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchComponent,
    TopComponent,
    ItemsTableComponent
  ]
})
export class SharedModule { }
