import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BookingDataService } from './booking-data.service';
import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
@NgModule({
  declarations: [
    AppComponent,
    
    
    // Add other components that belong to this module here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    UserModule,
    HttpClientModule
    
  ],
  providers: [BookingDataService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

