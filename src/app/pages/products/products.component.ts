import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart-service';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products!: Product []; // con el signo de exclamación " ! " nos deja de dar error por no inicializarla

  constructor(private productSvc: ProductsService, private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
    this.productSvc.getProducts()
    .pipe(tap((products: Product[]) =>console.log(this.products = products)))
    .subscribe()
  }

  addToCart(product: Product) {
    this.shoppingCartSvc.updateCart(product);
  }

}
