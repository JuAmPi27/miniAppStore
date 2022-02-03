import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';



@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

    products: Product[] = [];

    private cartSubject = new Subject<Product[]>();
    private totalSubject = new Subject<number>();
    private quantitySubject = new Subject<number>();

    // devolver estos observables hacia mi app para quien lo necesite consumir, para ello creamos un getter
    // convencion para cuando nosotros trabajamos con observables poner el signo de dolar $ al final
    get totalAction$(): Observable<number> {
        return this.totalSubject.asObservable();
    }
    
    get quantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }
    
    get cartAction$(): Observable<Product[]> {
        return this.cartSubject.asObservable();
    }

    updateCart(product:Product): void {
        this.addToCart(product);
        this.quantityProducts();
        this.calculoTotal();
    }


    private addToCart (product:Product): void {
        this.products.push(product);
        this.cartSubject.next(this.products);

    }

    private quantityProducts(): void {
        const quantity = this.products.length;
        this.quantitySubject.next(quantity);
    }

    private calculoTotal(): void {
        const total = this.products.reduce( (acc, prod) => acc += prod.price, 0);
        this.totalSubject.next(total);
    }   

}