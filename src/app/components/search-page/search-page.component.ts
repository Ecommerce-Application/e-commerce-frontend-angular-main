import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(private productsService: ProductService, private route: ActivatedRoute) { }
  param: string = '';
  type: string = '';
  filteredProducts: [] = [];
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.param = params.value;
        this.type = params.type;

      }
      );
    this.getFilteredProducts(this.param, this.type);
  }

  getFilteredProducts(searchParam: string, searchType: string) {
    this.productsService.searchProduct(searchParam, searchType).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) =>{
        console.log(err);
      }
    })

  }
}
