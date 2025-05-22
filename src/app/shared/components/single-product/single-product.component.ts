import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  prodId!: string;
  product!: Iproduct;
  ProdSub!: Subscription;
  selectedImg!: string;
  stars: Array<number> = [0, 1, 2, 3, 4];
  rating!: number;
  orderCount: number = 0;
  activeTab: string = 'details';
  constructor(
    private _actRoute: ActivatedRoute,
    private _productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.prodId = this._actRoute.snapshot.params['prodid'];
    this.ProdSub = this._productService
      .getProduct(this.prodId)
      .subscribe((res) => {
        this.product = res;
        console.log(this.product);
        this.selectedImg = this.product.images[0];
        this.rating = this.product.rating;
      });
  }

  getStarFill(index: number): string {
    const fullStars = Math.floor(this.rating);
    const partial = this.rating - fullStars;

    if (index < fullStars) {
      return '100%';
    } else if (index === fullStars) {
      return `${partial * 100}%`;
    } else {
      return '0%';
    }
  }

  ngOnDestroy(): void {
    this.ProdSub.unsubscribe();
  }

  increaseOnClick() {
    if (this.orderCount >= 0) {
      this.orderCount++;
    }
  }
  reducOnClick() {
    if (this.orderCount > 0) {
      this.orderCount--;
    }
  }
}
