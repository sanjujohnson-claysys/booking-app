import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { HomeModule } from './home/home.module';
import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './footer/footer.component';
import { UserBookingStatusService } from 'src/app/user-booking-status.service';
import { ReactiveFormsModule } from '@angular/forms';
import { adminBookingService } from './admin-booking.service';
import { RouterModule, Routes } from '@angular/router';
import { UserRoutingModule } from './user/user-routing/user-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,

    // Add other components that belong to this module here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    UserModule,
    HttpClientModule,
    HomeModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    UserRoutingModule,
    RouterModule,
    // AdminRoutingModule,
  ],
  providers: [DataService, UserBookingStatusService, adminBookingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
