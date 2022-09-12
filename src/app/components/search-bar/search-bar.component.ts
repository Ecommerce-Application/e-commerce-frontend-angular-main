import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchParam: string = '';
  searchType: string = '';
  param: string = '';
  type: string = '';
  filteredProducts: any;

  constructor(private route: Router, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  // searchProduct() {
  //   this.route.navigate([`/search`], { queryParams: { value: this.searchParam, type: this.searchType } });

  //   this.activeRoute.queryParams
  //     .subscribe(params => {
  //       this.param = params.value;
  //       this.type = params.type;
  //     }
  //     );

  // }
}
