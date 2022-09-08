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

  param: string='';
  type: string='Search By:';
  

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => this.allProducts = resp,
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );
  }

  getFilteredProducts() {

    this.productService.searchProduct(this.param, this.type).subscribe({
      next: (response) => {
        this.allProducts = response;
        console.log(response);
      },
      error: (err) =>{
        console.log(err);
      }
    })

  }

}
