import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { TopComponent } from './top/top.component';
import { ItemsTableComponent } from './items-table/items-table.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SearchComponent,
    TopComponent,
    ItemsTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  exports: [
    SearchComponent,
    TopComponent,
    ItemsTableComponent
  ]
})
export class SharedModule { }
