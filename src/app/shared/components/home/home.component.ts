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
        console.log(this.categoryWithSubcategoriesArr);
      },
    });
  }

  onHover(index: number) {
    this.hoveredCategoryIndex = index;
  }

  onLeave() {
    this.hoveredCategoryIndex = null;
  }
}
