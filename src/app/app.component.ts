import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'booking-app';
  isUser: boolean = true; // Set to true if the user is an user, otherwise, set to false.
  isAdmin: boolean = false;
}
