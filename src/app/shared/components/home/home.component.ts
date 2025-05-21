import { Component, OnInit } from '@angular/core';
import {
  ICategoryWithSubcategories,
  Iproduct,
} from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  productsArr!: Array<Iproduct>;
  categoryWithSubcategoriesArr!: Array<ICategoryWithSubcategories>;
  hoveredCategoryIndex: number | null = null;
  topRatedProductsArr: Iproduct[] = [];

  
  constructor(private _productsService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productsService.fetchAllProducts().subscribe({
      next: (res) => {
        this.productsArr = res;

        const categories = [...new Set(res.map((p) => p.category))];
        const categoryWithSubcategoriesArr = categories.map((category) => {
          const subcategoriesSet = new Set(
            res
              .filter((p) => p.category === category && p.subcategory)
              .map((p) => p.subcategory)
          );
          return {
            category: category,
            subcategories: [...subcategoriesSet],
          };
        });

        this.categoryWithSubcategoriesArr = categoryWithSubcategoriesArr;
        
        this.topRatedProductsArr = this.getTopRatedProductPerCategory();
      },
    });
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
