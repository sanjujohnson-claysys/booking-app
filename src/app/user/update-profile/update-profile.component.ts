import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { DataService } from 'src/app/shared/shared-service/data.service';
import { EmployeeDetails } from '../employeedetails';
import { UserService } from 'src/app/user/userService/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  signupForm!: FormGroup;
  departments: string[] = ['A', 'B', 'C'];
  positions: { [key: string]: string[] } = {
    A: ['1A', '2A', '3A'],
    B: ['1B', '2B', '3B'],
    C: ['1C', '2C', '3C'],
  };
  employeeDetails: EmployeeDetails | undefined;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private EmployeeData: UserService
  ) {}

  ngOnInit() {
    this.fetchEmployeeData(23);

    this.signupForm = this.fb.group({
      firstName: [this.employeeDetails?.firstName, Validators.required],
      lastName: [this.employeeDetails?.lastName, Validators.required],
      gender: [this.employeeDetails?.gender, Validators.required],
      dob: [this.employeeDetails?.dob.getDate, Validators.required],
      department: [this.employeeDetails?.department, Validators.required],
      position: [this.employeeDetails?.position, Validators.required],
      address: [
        this.employeeDetails?.address,
        [Validators.required, Validators.minLength(15)],
      ],
      pincode: [this.employeeDetails?.pincode, Validators.required],
      aadhar: [this.employeeDetails?.aadhar, Validators.required],
      email: [
        this.employeeDetails?.email,
        [Validators.required, Validators.email],
      ],
      phone: [
        this.employeeDetails?.phone,
        [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
      ],
      password: [
        this.employeeDetails?.password,
        [Validators.required, Validators.minLength(8)],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  fetchEmployeeData(id: number): void {
    this.EmployeeData.getEmployeeDataById(id).subscribe(
      (data: EmployeeDetails) => {
        this.employeeDetails = data;
        this.signupForm?.patchValue(data);
      }
    );
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
    for (const controlName in this.signupForm?.controls) {
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
      const formData = this.signupForm?.value;
      this.dataService.postEmployees(formData).subscribe((response: JSON) => {
        console.log('Backend response:', response);
      });
    }
  }
}
