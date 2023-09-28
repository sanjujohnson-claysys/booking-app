import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSignupComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeeSignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[EmployeeSignupComponent]
})
export class UserModule { }
