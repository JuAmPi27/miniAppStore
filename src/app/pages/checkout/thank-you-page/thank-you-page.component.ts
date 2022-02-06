import { Component } from '@angular/core';

@Component({
  selector: 'app-thank-you-page',
  template: `
  <<mat-card>
 class="container">
  <h1 class="titulo">Thank you!!</h1>
  <p class="contenido">...Your order is on the way...</p>
  </mat-card>`,
  styleUrls: ['./thank-you-page.component.css']
})
export class ThankYouPageComponent {

  constructor() { }

}
