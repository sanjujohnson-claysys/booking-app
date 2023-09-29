import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { HomepageComponent } from './home/homepage/homepage.component'; // Replace with the actual path to your home component
import { EmployeeSignupComponent } from './home/sign-up/sign-up.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'about', component:AboutUsComponent  },
  { path: 'signup', component: EmployeeSignupComponent},
  { path: 'signin', component: SignInComponent },
  { path: 'contact', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
