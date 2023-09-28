import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from '../home/homepage/homepage.component';
import { NavHomeComponent } from '../home/nav-home/nav-home.component';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [HomepageComponent,NavHomeComponent,FooterComponent],
  imports: [
    CommonModule,
    
  ],
  exports:[HomepageComponent,NavHomeComponent,FooterComponent]
})
export class HomeModule { }
