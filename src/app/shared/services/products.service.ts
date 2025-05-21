import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IprodResponse, Iproduct } from '../models/products.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  BASE_URL: string = `${environment.baseUrl}`;
  PRODUCT_URL: string = `${this.BASE_URL}/products`;

  LIMIT_BASE_URL: string = `${environment.base_url_limit}`;
  LIMITED_PRODUCTS_URL: string = `${this.LIMIT_BASE_URL}/products`;

  constructor(private _http: HttpClient) {}

  fetchAllProducts(): Observable<Array<Iproduct>> {
    return this._http.get<Array<Iproduct>>(this.PRODUCT_URL);
  }

  getProductsPaginated(
    category?: string,
    subcategory?: string,
    skip: number = 0,
    limit: number = 10
  ): Observable<Iproduct[]> {
    let url = '';

    if (category || subcategory) {
      url = `${this.BASE_URL}/products/filter?limit=${limit}&skip=${skip}`;
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }
      if (subcategory) {
        url += `&subcategory=${encodeURIComponent(subcategory)}`;
      }
    } else {
      url = `${this.LIMITED_PRODUCTS_URL}?limit=${limit}&skip=${skip}`;
    }

    return this._http.get<Iproduct[]>(url);
  }
  fetchSomeProducts(){
    return this._http.get<IprodResponse>(this.LIMITED_PRODUCTS_URL)
  }
}
