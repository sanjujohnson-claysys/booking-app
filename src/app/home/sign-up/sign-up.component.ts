import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/shared-service/data.service';
import { ToastService } from 'src/app/shared/shared-service/toast.service';

@Component({
  selector: 'app-employee-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class EmployeeSignupComponent {
  signupForm: FormGroup;

  departments: string[] = ['Department A', 'Department B', 'Department C'];

  positions: { [key: string]: string[] } = {
    'Department A': ['Position 1A', 'Position 2A', 'Position 3A'],
    'Department B': ['Position 1B', 'Position 2B', 'Position 3B'],
    'Department C': ['Position 1C', 'Position 2C', 'Position 3C'],
  };

  constructor(private fb: FormBuilder, private dataService: DataService,private toastService: ToastService, private router: Router) {
    this.signupForm = this.fb.group(
      {
        firstName: ['',Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
          this.noLeadingOrTrailingSpaceValidator],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        dob: ['', Validators.required, this.validateAge],
        department: ['', Validators.required],
        position: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(15)]],
        pincode: ['', Validators.required],
        aadhar: ['', Validators.required],
        // departments: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }
  noLeadingOrTrailingSpaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && (value.startsWith(' ') || value.endsWith(' '))) {
      return { 'noLeadingOrTrailingSpace': true };
    }
    return null;
  }
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password!.value !== confirmPassword!.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
  // updatePositions() {
  //   const selectedDepartment = this.signupForm.get('department')!.value;
  //   this.signupForm.get('position')!.setValue('');
  // }
  validateAge(
    control: FormControl
  ): Promise<{ [key: string]: boolean } | null> {
    return new Promise((resolve) => {
      if (control.value) {
        const dob = new Date(control.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();

        if (age < 18) {
          resolve({ underage: true });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  }

  checkAllControlsValidity(): boolean {
    let isValid = true;
    console.log(this.signupForm.controls);
    for (const controlName in this.signupForm.controls) {
      const control = this.signupForm.get(controlName);

      if (control!.invalid) {
        isValid = false;
        control!.markAsTouched();
      }
    }

    return isValid;
  }

  onSubmit() {
    const isFormValid = this.checkAllControlsValidity();

    if (isFormValid) {
      // Send the form data to the backend using the data service
      const formData = this.signupForm.value;
      console.log('inside the onsubmit method');
      // Replace 'your-backend-url' with the actual URL where you want to send the data
      this.dataService.postEmployees(formData).subscribe((response: JSON) => {
        // Handle the backend response here if needed
        console.log('Backend response:', response);
        this.toastService.showToast('Sign-up successful!');
        console.log('toast code is executed!')
        setTimeout(() => {
          this.router.navigate(['/sign in']);
        }, 2500);
        

      });
    }
  }
}
