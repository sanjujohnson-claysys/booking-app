// toast.service.ts

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000, // Duration in milliseconds
    });
  }
}
