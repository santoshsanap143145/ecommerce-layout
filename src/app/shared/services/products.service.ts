import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../models/products.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  BASE_URL: string = `${environment.baseUrl}`;
  PRODUCT_FILTER_URL: string = `${this.BASE_URL}/products/filter`;
  ALL_PRODUCTS_URL: string = `${this.BASE_URL}/products`;

  constructor(private _http: HttpClient) {}

  // For category or subcategory filtered products with pagination
  getProductsByCategory(
    category: string = '',
    subcategory: string = '',
    page: number = 1,
    limit: number = 10
  ): Observable<Iproduct[]> {
    let url = `${this.PRODUCT_FILTER_URL}?page=${page}&limit=${limit}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    if (subcategory) {
      url += `&subcategory=${encodeURIComponent(subcategory)}`;
    }
    return this._http.get<Iproduct[]>(url);
  }

  // For all products paginated
  getAllProducts(page: number = 1, limit: number = 10): Observable<Iproduct[]> {
    const url = `${this.ALL_PRODUCTS_URL}?page=${page}&limit=${limit}`;
    // Assuming this returns { data: Iproduct[] } structure
    return this._http.get<{ data: Iproduct[] }>(url).pipe(
      map(response => response.data)
    );
  }

  getProduct(prodId: string): Observable<Iproduct> {
    return this._http.get<Iproduct>(`${this.ALL_PRODUCTS_URL}/${prodId}`);
  }
}
