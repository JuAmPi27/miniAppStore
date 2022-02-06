import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart-service';
import { Product } from '../products/interfaces/product.interface';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  model = {
    name: "",
    store: "",
    shippingAddress: "",
    city: "",
  };

  cart: Product[] = [];
  isDelivery = true;
  stores: Store[] = [];

  constructor(
    private dataSvc: DataService, 
    private shoppingCartSvc: ShoppingCartService,
    private router:Router,
    private productSvc: ProductsService) {
      this.checkIfCartIsEmpty();
     }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickUpOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm ): void {
    console.log("guardar", formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery,
    }
    this.dataSvc.saveOrders(data)
    .pipe( 
      tap(res => console.log("order=>", res)),
      switchMap(({ id:orderId }) => {
        const details = this.prepareDetails();
        return this.dataSvc.saveDetailsOrder({ details, orderId });
  }),
  tap(() => this.router.navigate(['/checkout/thank-you-page'])),
  delay(2000), // ....investigar operador delay......
  tap(() => this.shoppingCartSvc.resetCart())
    )
  .subscribe();
  }

  private getStores(): void { // ver que hace el operador tap y como desubscribrse de un observable
    this.dataSvc.getStore().pipe( tap((stores: Store[]) => this.stores = stores)).subscribe();
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach( (product: Product) => {
      const {id: productId, name: productName, quantity, stock} = product;
      const updateStock = (stock - quantity);
      this.productSvc.updateStock(productId, updateStock)
      .pipe(
        tap(() =>  details.push({ productId, productName, quantity }))
      )
      .subscribe()

    });
    return details;
  }
     

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products: Product[]) => this.cart = products)
    )
    .subscribe();
  }

  checkIfCartIsEmpty(): void {
    //
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap( (products: Product[]) => {
        if(Array.isArray(products) && !products.length) {
          this.router.navigate(['/products']);
        }
      })
    )
    .subscribe()
  }

}


