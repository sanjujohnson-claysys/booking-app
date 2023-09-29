import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const username: string = this.signInForm.value.email;
      const password: string = this.signInForm.value.password;
      
      // Call the handlelogin function defined within this component
      this.handleLogin(username, password);
    }
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  // Define the handlelogin function within the component
  private handleLogin(username: string, password: string): void {
  // Attempt to log in using the authService.
  const loginSubscription = this.authService.login(username, password).subscribe({
    next: (response: { token: any }) => {
      // When the login is successful, set the token and handle further actions.
      this.authService.setToken(response.token);
      // Now you can handle the successful login, e.g., navigate to a protected route.
      // Example: this.router.navigate(['/protected']);
    },
    error: (error: any) => {
      // Handle login error.
      console.error("Login error:", error);
      // You can handle the login error here, e.g., show an error message to the user.
    },
    complete: () => {
      // This block is optional. It's called when the observable is completed.
      // You can use it for any cleanup or final actions if needed.
    },
  });

  // It's important to unsubscribe when the component is destroyed to prevent memory leaks.
  // Assuming you have ngOnDestroy method:
  // ngOnDestroy() {
  //   loginSubscription.unsubscribe();
  // }
}

}
