import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [ 
    MatToolbarModule, 
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,
    MatOptionModule
  ]
})

export class MaterialModule { }
