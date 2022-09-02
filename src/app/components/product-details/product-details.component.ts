import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: string = '';
  constructor(private productsService: ProductService, private param: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.param.snapshot.params['id'];
    this.getProduct(parseInt(this.productId));
  }

  getProduct(id: number) {
    this.productsService.getSingleProduct(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err)=>{
        console.log(err);
      },
      complete() {
        console.log("Success Got Product")
      },
    })
    
  }
}
