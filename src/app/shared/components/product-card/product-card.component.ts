import { Component, Input, OnInit } from '@angular/core';
import { Iproduct } from '../../models/products.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Iproduct;

  hoveredProductId: string | null = null;
  stars: number[] = [0, 1, 2, 3, 4];

  constructor() { }

  ngOnInit(): void {
  }

  getStarFill(index: number, rating: number): string {
    const fullStars = Math.floor(rating);
    const partial = rating - fullStars;

    if (index < fullStars) {
      return '100%';
    } else if (index === fullStars) {
      return `${partial * 100}%`;
    } else {
      return '0%';
    }
  }

}
