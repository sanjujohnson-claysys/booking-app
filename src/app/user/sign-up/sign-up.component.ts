import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-employee-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class EmployeeSignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
      aadhar: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

    checkAllControlsValidity(): boolean {
    let isValid = true;

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

      // Replace 'your-backend-url' with the actual URL where you want to send the data
      this.dataService.sendFormData('your-backend-url', formData).subscribe((response: JSON) => {
        // Handle the backend response here if needed
        console.log('Backend response:', response);
      });
    }
  }
}

