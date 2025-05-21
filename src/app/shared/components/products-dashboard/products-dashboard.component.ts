import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Iproduct } from '../../models/products.model';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss'],
})
export class ProductsDashboardComponent implements OnInit {
  category: string | null = null;
  subcategory: string | null = null;
  productsArr: Iproduct[] = [];
  loading: boolean = true;
  hoveredProductId: string | null = null;
  stars: Array<number> = [0, 1, 2, 3, 4];

  constructor(
    private _route: ActivatedRoute,
    private _productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
      this.subcategory = params.get('subcategory');

      const category = this.category || '';
      const subcategory = this.subcategory || '';

      this._productsService
        .getProductsPaginated(category, subcategory, 0, 10)
        .subscribe({
          next: (data) => {
            console.log('Products fetched:', data);
            this.productsArr = data;

            this.productsArr = data.map((prod) => ({
              ...prod,
              discount: (Math.floor(Math.random() * 10) + 1) * 5,
            }));
          },
          error: (err) => console.error('Error fetching products:', err),
        });
    });
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
