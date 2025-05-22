import { Component, HostListener, OnInit } from '@angular/core';
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

  page: number = 1;
  limit: number = 10;
  hasNextPage: boolean = true;
  loading: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this._route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.subcategory = params.get('subcategory');
      this.resetAndLoad();
    });
  }

  resetAndLoad() {
    this.page = 1;
    this.productsArr = [];
    this.hasNextPage = true;
    this.loadProducts(true);
  }

  loadProducts(initialLoad: boolean = false) {
    if (this.loading || !this.hasNextPage) return;

    this.loading = true;

    let fetchObservable;

    if (this.category || this.subcategory) {
      fetchObservable = this._productsService.getProductsByCategory(
        this.category || '',
        this.subcategory || '',
        this.page,
        this.limit
      );
    } else {
      fetchObservable = this._productsService.getAllProducts(this.page, this.limit);
    }

    fetchObservable.subscribe({
      next: (data) => {
        // Add random discount to each product (optional)
        const productsWithDiscount = data.map(prod => ({
          ...prod,
          discount: (Math.floor(Math.random() * 10) + 1) * 5,
        }));

        this.productsArr.push(...productsWithDiscount);

        if (data.length < this.limit) {
          this.hasNextPage = false; // No more pages
        } else {
          this.page++;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.loading = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const bottomReached =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

    if (bottomReached && this.hasNextPage && !this.loading) {
      this.loadProducts();
    }
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
