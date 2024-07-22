import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './home/homeServices/auth.service';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TriggerNavbarService } from './shared/shared-service/trigger-navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;

  title = 'booking-app';
  isUser: boolean = false;
  isAdmin: boolean = false;
  role:string
  // currentRoute: string = '';
  | undefined
  
  // currentRoute: string = '';

  constructor(private authservice: AuthService, private router: Router, private route: ActivatedRoute,
    private navBarService:TriggerNavbarService) {
  }
  ngDoCheck(){
    this.isUser = false;
  this.isAdmin = false;
      this.role = this.authservice.decodeRoles()[2];
      this.setNavbarRole();
  }

  ngOnInit() {
    this.subscription = this.navBarService.navbarRole$.subscribe(() => {
      this.isUser = false;
  this.isAdmin = false;
      this.role = this.authservice.decodeRoles()[2];
      this.setNavbarRole();
      console.log("setNavbarRole function triggered")
    });
  }
   
  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log("ondestroy triggered")
    }
  }

    // Subscribe to router events to determine the current route
    // this.router.events.pipe(
    //   filter((event: Event) => event instanceof NavigationEnd),
    //   map(() => this.router.url)
    // ).subscribe((url: string) => {
    //   // Update the currentRoute based on the current URL
    //   this.currentRoute = url.split('/')[1]; // Assumes that the first segment of the URL corresponds to the module
    // console.log(this.currentRoute)
    // });
  

  setNavbarRole(): void {
    if (this.role === "User") {
      this.isUser = true;
    } else if (this.role === "Admin") {
      this.isAdmin = true;
    }
  }
  

  // refreshPage() {
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   this.router.navigate([this.router.url]);
  // }
}
