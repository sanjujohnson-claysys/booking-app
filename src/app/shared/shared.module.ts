import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking/booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { GraphDataService } from '../graph-data.service';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { GraphComponent } from './graph/graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Import HttpClientModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminBookingComponent } from './admin-booking/admin-booking.component';
import { adminBookingService } from '../admin-booking.service';
import { AdminActionsService } from '../admin-actions.service';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingCancellationComponent } from './booking-cancellation/booking-cancellation.component';
import { BookingDetailsByIdComponent } from './booking-details-by-id/booking-details-by-id.component';

@NgModule({ declarations: [
        BookingComponent,
        BookingDetailsComponent,
        GraphComponent,
        AdminBookingComponent,
        BookingListComponent,
        BookingCancellationComponent,
        BookingDetailsByIdComponent,
    ], // Include BookingDataService in the providers array
    exports: [
        BookingComponent,
        BookingDetailsComponent,
        GraphComponent,
        AdminBookingComponent,
        BookingCancellationComponent,
        BookingDetailsByIdComponent,
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule,
        BrowserAnimationsModule], providers: [
        DataService,
        AuthService,
        GraphDataService,
        adminBookingService,
        AdminActionsService,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class SharedModule {}
