import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedDate: ['', Validators.required]
    });
  }

  // Custom validator to check if a date is a Sunday
  isSunday(date: Date): boolean {
    return date.getDay() === 0; // Sunday is represented by 0 in JavaScript Date object
  }

  // Function to disable Sundays and dates beyond 7 days from the current day
  get minDate(): string {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current time to midnight

    return currentDate.toISOString().split('T')[0]; // Convert to ISO format (yyyy-mm-dd)
  }

  get maxDate(): string {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current time to midnight

    const maxDate = new Date(currentDate);
    maxDate.setDate(maxDate.getDate() + 7); // 7 days from the current date

    return maxDate.toISOString().split('T')[0]; // Convert to ISO format (yyyy-mm-dd)
  }
}
