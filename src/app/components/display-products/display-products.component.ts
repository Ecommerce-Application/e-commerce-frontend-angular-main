import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  allProducts: Product[] = [];
  param: string = '';
  type: string = '';
  errorMessage: string = '';


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => this.allProducts = resp,
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );
  }

  getFilteredProducts() {
    if (this.param === '') {
      this.errorMessage = "Search Field Is Empty"
    } else if (this.type === '') {
      this.errorMessage = 'Select A Search Category'
    } else {
      this.productService.searchProduct(this.param, this.type).subscribe({
        next: (response) => {
          if (response.length === 0) {
            this.errorMessage = "No Product Found"
          } else {
            this.allProducts = response;
            this.errorMessage = '';
          }
        },
        error: (err) => {
          this.errorMessage = "Incorrect Values Entered"
        }
      })
    }


  }

}
