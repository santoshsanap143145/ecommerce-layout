import { Component, OnInit } from '@angular/core';
import {
  ICategoryWithSubcategories,
  Iproduct,
} from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { EMPTY, expand, map, reduce, takeWhile } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productsArr: Iproduct[] = [];
  categoryWithSubcategoriesArr: ICategoryWithSubcategories[] = [];
  hoveredCategoryIndex: number | null = null;
  topRatedProductsArr: Iproduct[] = [];

  constructor(private _productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadAllProductsPaginated();
  }

  loadAllProductsPaginated(): void {
    const limit = 20;
    let page = 1;

    this._productsService.getAllProducts(page, limit).pipe(
      expand((res) => {
        // Stop expanding when less than limit returned
        if (res.length < limit) return EMPTY;
        page++;
        return this._productsService.getAllProducts(page, limit);
      }),
      reduce((acc, curr) => [...acc, ...curr], [] as Iproduct[])
    ).subscribe({
      next: (allProducts: Iproduct[]) => {
        this.productsArr = allProducts.map((prod) => ({
          ...prod,
          discount: (Math.floor(Math.random() * 10) + 1) * 5,
        }));

        this.buildCategoryStructure();
        this.topRatedProductsArr = this.getTopRatedProductPerCategory();
      },
      error: (err) => {
        console.error('Error loading paginated products:', err);
      }
    });
  }

  buildCategoryStructure(): void {
    const categoryMap = new Map<string, Set<string>>();

    this.productsArr.forEach((prod) => {
      if (!categoryMap.has(prod.category)) {
        categoryMap.set(prod.category, new Set());
      }

      if (prod.subcategory) {
        categoryMap.get(prod.category)!.add(prod.subcategory);
      }
    });

    this.categoryWithSubcategoriesArr = Array.from(categoryMap.entries()).map(
      ([category, subSet]) => ({
        category,
        subcategories: Array.from(subSet),
      })
    );
  }

  onHover(index: number) {
    this.hoveredCategoryIndex = index;
  }

  onLeave() {
    this.hoveredCategoryIndex = null;
  }

  getTopRatedProductPerCategory(): Iproduct[] {
    const topRatedProducts: Iproduct[] = [];

    for (const item of this.categoryWithSubcategoriesArr) {
      const category = item.category;

      const productsInCategory = this.productsArr.filter(
        (product) => product.category?.toLowerCase() === category.toLowerCase()
      );

      if (productsInCategory.length > 0) {
        const sorted = productsInCategory.sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        topRatedProducts.push(sorted[0]);
      }
    }

    return topRatedProducts;
  }
}
