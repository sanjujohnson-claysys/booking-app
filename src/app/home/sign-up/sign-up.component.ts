import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-employee-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class EmployeeSignupComponent {
  signupForm: FormGroup;

  departments: string[] = ['Department A', 'Department B', 'Department C'];

  positions: { [key: string]: string[] } = {
    'Department A': ['Position 1A', 'Position 2A', 'Position 3A'],
    'Department B': ['Position 1B', 'Position 2B', 'Position 3B'],
    'Department C': ['Position 1C', 'Position 2C', 'Position 3C']
  };

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required, this.validateAge],
       department: ['', Validators.required],
      position: ['', Validators.required],
      address: ['', [Validators.required,Validators.minLength(15)]],
      pincode: ['', Validators.required],
      aadhar: ['', Validators.required],
      departments: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
      updatePositions() {
    const selectedDepartment = this.signupForm.get('department')!.value;
    this.signupForm.get('position')!.setValue('');
  }
   validateAge(control: FormControl): Promise<{ [key: string]: boolean } | null> {
  return new Promise((resolve) => {
    if (control.value) {
      const dob = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();

      if (age < 18) {
        resolve({ 'underage': true });
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
      this.dataService.postEmployees(formData).subscribe((response: JSON) => {
        // Handle the backend response here if needed
        console.log('Backend response:', response);
      });
    }
  }
}

