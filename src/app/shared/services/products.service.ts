import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../models/products.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  BASE_URL: string = `${environment.baseUrl}`
  PRODUCT_URL: string = `${this.BASE_URL}/products`
  
  constructor(private _http: HttpClient) { }


  fetchAllProducts(): Observable<Array<Iproduct>>{
    return this._http.get<Array<Iproduct>>(this.PRODUCT_URL)
  }
}
