import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomepageComponent } from './homepage/homepage.component'; // Replace with the actual path to your home component
import { EmployeeSignupComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SignOutComponent } from '../sign-out/sign-out.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'about', component:AboutUsComponent  },
  { path: 'signup', component: EmployeeSignupComponent},
  { path: 'signin', component: SignInComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'signout', component: SignOutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
