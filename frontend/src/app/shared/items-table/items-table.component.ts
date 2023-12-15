import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/interfaces';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.sass']
})
export class ItemsTableComponent {
  @Input() items:IProduct[] = []

}
