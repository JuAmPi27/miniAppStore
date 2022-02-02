import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private apiUrl = "http://localhost:5000/products";
  
  constructor(private http: HttpClient) { }

getProducts() :Observable<Product[]> {
  return this.http.get<Product[]>(this.apiUrl);
}

}
