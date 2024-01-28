import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.css']
})
export class NavHomeComponent implements OnInit {
  isLoggedIn: boolean = false; // Set this to true if the user is logged in

  constructor() {}

  ngOnInit(): void {}

  logout() {
    // Implement your logout logic here
    // For example, clear user authentication state and redirect
  }
}

