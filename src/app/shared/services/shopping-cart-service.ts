import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';



@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

    products: Product[] = [];

    // !!!!!.....ver diferencia del Subject y el BehaviorSubject......!!!!!!!
    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

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
        const isProductInCart = this.products.find(({id}) => id === product.id);
        if(isProductInCart) {
            isProductInCart.quantity += 1;
        } else {
            this.products.push({ ...product, quantity: 1 })
        }
        
        this.cartSubject.next(this.products);
    }

    private quantityProducts(): void {
        const quantity = this.products.reduce((acc, prod) => acc += prod.quantity, 0);;
        this.quantitySubject.next(quantity);
    }

    private calculoTotal(): void {
        const total = this.products.reduce((acc, prod) => acc += (prod.price * prod.quantity), 0);
        this.totalSubject.next(total);
    }   

}