import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './shared/booking/booking.component';
import { AdminRoutingModule } from './admin/admin.module';
import { HomeRoutingModule } from './home-routing.module';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { EmployeeSignupComponent } from './home/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'booking', component: BookingComponent },
  { path: 'sign up', component: EmployeeSignupComponent },
  { path: 'sign in', component: SignInComponent },
  

  {
    path: 'admin-actions',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminRoutingModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes), AdminRoutingModule],
  exports: [RouterModule, AdminRoutingModule],
})
export class AppRoutingModule {}
