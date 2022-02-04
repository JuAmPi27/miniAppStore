import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsOrder, Order } from '../interfaces/order.interface';
import { Store } from '../interfaces/stores.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  getStore(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiURL}/stores`); //bakstits con alt 96
  }

  // lo ideal seria que una clase especifica se encargara de las orders pero en este caso al ser una demo la hacemos dentro de esta
  saveOrders(order: Order): Observable<Order> {
    return this.http.post<any>(`${this.apiURL}/orders`, order)
  }

  // si tuvieramos un back end este metodo no seria necesario
  saveDetailsOrder (details: DetailsOrder): Observable<DetailsOrder> {
    return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`, details)
  }

}
