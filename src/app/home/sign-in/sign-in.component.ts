import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/home/homeServices/auth.service';
import { Router } from '@angular/router';
import { TriggerNavbarService } from 'src/app/shared/shared-service/trigger-navbar.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router,private navBarService:TriggerNavbarService) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  role: string | undefined;
  onSubmit() {
    if (this.signInForm.valid) {
      const email: string = this.signInForm.value.email;
      const password: string = this.signInForm.value.password;
      
     
      this.handleLogin(email, password);
      console.log("login button working")
    }
  }
  isUser: boolean = false; // Set to true if the user is an user, otherwise, set to false.
  isAdmin: boolean = false;
  
  setUserRole():void{
    console.log(this.role)
    if(this.role === "User"){
      this.isUser = true;}
    else if(this.role === "Admin"){
      this.isAdmin = true;
    }  
  }



  // Define the handleLogin function within the component
  private handleLogin(username: string, password: string): void {
    this.authService.login(username, password).subscribe(
      (response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          
          this.role = this.authService.decodeRoles()[2];
          this.setUserRole();
          if (this.isAdmin) {
            this.router.navigate(['admin-actions']);
          } else if (this.isUser) {
            this.router.navigate(['user']);
          } else {
            // Additional logic if neither admin nor user
            console.log("can not decide whether user or admin")
          }

          // Trigger the function in Component2 using EventEmitter
          this.navBarService.triggerNavbarRole();
        } else {
          console.error('Token not found in the response.');
          // Handle the case where the token is not present in the response
        }
      },
      (error) => {
        console.error('Login failed!', error);
        // Handle error responses if the login fails
      }
    );
  }

}
// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/home/homeServices/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.scss'],
// })
// export class LoginComponent {
//   form = new FormGroup({
//     username: new FormControl(null, Validators.required),
//     password: new FormControl(null, Validators.required),
//   });

//   constructor(private authService: AuthService, private router: Router) {}

//   submitForm() {
//     if (this.form.invalid) {
//       return;
//     }

//     this.authService
//       .login(this.form.get('username')?.value, this.form.get('password')?.value)
//       .subscribe((response) => {
//         this.router.navigate(['/dashboard']);
//       });
//   }
// }
