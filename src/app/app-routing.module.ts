import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './shared/booking/booking.component';
import { AdminRoutingModule } from './admin/admin.module';

const routes: Routes = [
  { path: 'booking', component: BookingComponent },
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
