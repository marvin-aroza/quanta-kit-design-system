import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [
    ButtonComponent  // Import standalone component
  ],
  exports: [
    ButtonComponent
  ]
})
export class QuantaKitAngularModule { }
