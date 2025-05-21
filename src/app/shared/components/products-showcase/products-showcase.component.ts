import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-showcase',
  templateUrl: './products-showcase.component.html',
  styleUrls: ['./products-showcase.component.scss']
})
export class ProductsShowcaseComponent implements OnInit {
  productsArr!: Array<Iproduct>
  constructor(private _productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this._productService.fetchSomeProducts().subscribe(res => {
      this.productsArr = res.data
      console.log(this.productsArr);
    })
  }
}
