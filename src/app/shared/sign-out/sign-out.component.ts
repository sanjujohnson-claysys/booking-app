import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TriggerNavbarService } from '../shared-service/trigger-navbar.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent {
  constructor(private router: Router,private navBarService:TriggerNavbarService) {
    this.logout();
  }

  logout() {
    // Remove JWT from local storage
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('token')

    // Redirect to the signin component
    this.navBarService.triggerNavbarRole();
    this.router.navigate(['/user/sign-in']);
  }
}

