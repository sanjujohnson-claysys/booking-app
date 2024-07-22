import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from '../home/homepage/homepage.component';
import { NavHomeComponent } from '../home/nav-home/nav-home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { EmployeeSignupComponent } from './sign-up/sign-up.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { RouterModule } from '@angular/router';
import {HomeRoutingModule} from './home-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RouterOutlet } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [HomepageComponent,NavHomeComponent,SignInComponent,EmployeeSignupComponent,HomeMainComponent,AboutUsComponent,ContactUsComponent],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatExpansionModule

    
  ],
  exports:[HomepageComponent,NavHomeComponent,SignInComponent,EmployeeSignupComponent,HomeMainComponent,AboutUsComponent,ContactUsComponent]
})
export class HomeModule { }










