import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  @Input() adminProducts:IProduct[] = []
  @Output() sendSelected = new EventEmitter()

  public foundProducts:IProduct[] = []
  public searchString:string = ''

  handleSearch(e:any) {
    this.searchString = e.target.value
    if (!this.searchString) {
      this.foundProducts = []      
    }
    else {
      const found = this.adminProducts.filter(item => {
        const lowName = item.name.toLowerCase()
        const lowSearch = this.searchString.toLowerCase()
        return lowName.includes(lowSearch)
      })
      this.foundProducts = found
    }
  }

  hanldeSelected(selected:IProduct) {
    this.foundProducts = []
    this.sendSelected.emit(selected)
    this.searchString = ''
  }

}
