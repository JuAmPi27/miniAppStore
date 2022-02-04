import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';

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

  isDelivery = false;
  stores: Store[] = [];

  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    this.getStores();
  }

  onPickUpOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit(): void {
    console.log("guardar");
  }

  private getStores(): void { // ver que hace el operador tap y como desubscribrse de un observable
    this.dataSvc.getStore().pipe( tap((stores: Store[]) => this.stores = stores)).subscribe();
  }

}
