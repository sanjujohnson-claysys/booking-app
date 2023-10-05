import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserBookingStatusService } from 'src/app/user-booking-status.service';


class Room {
  code: string = 'A';
  isFull: boolean = false;
  optionsLeft: number = -1;
  rows: number[] = [0, 1, 2, 3, 4];
  cols: number[] = [0, 1, 2, 3, 4];
  workspaces: Workspace[][] = [];

  getCellNumber(rowIndex: number, colIndex: number): number {
    return rowIndex * this.cols.length + colIndex + 1;
  }
}

class Workspace {
  isTaken: boolean = false;
  isFree: boolean = true;
  isSelected: boolean = false;
  isBooked: boolean = false;
  userId: string = "-1";
  row: number = -1;
  column: number = -1;
  room: Room["code"] | undefined;
  time: string | undefined;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  selectedTime: string = ""; // Initialize as null
  selectedRoom: string = ''; // Initialize with 'A' by default

  workspaceStatus: { row: number, col: number, status: string, bookedBy: string }[] = [];
  selectedWorkspace: { row: number, col: number } | null = null;

  room: Room = new Room();
  workspace: Workspace = new Workspace();
  randomNumber = (Math.floor(Math.random() * 30) + 1);
  selectedDate: string = Date();
  currentDate: string;
  // maxDate: string;

  // Define form controls using FormBuilder
  dateControl = this.fb.control('', [Validators.required]);
  timeControl = this.fb.control('', [Validators.required]);
  roomControl = this.fb.control('', [Validators.required]);

  // Create the form group
  form: FormGroup = this.fb.group({
    date: this.dateControl,
    time: this.timeControl,
    room: this.roomControl,
  });
 
  constructor(private sendData: DataService, private fb: FormBuilder, private  bookingService: UserBookingStatusService) {
    const today = new Date();
    this.currentDate = this.formatDate(today);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);
    // this.maxDate = this.formatDate(maxDate);
    
    console.log("constructor inside"+this.selectedDate)
    this.initializeWorkspaceStatus();
  }
  
  bookingData: any[] = [];
  loading = false;
  error = '';
ngOnInit(): void {
this.searchWorkspace();
}

findWorkspace(squareNumber: number): Workspace {
  if (squareNumber < 1 || squareNumber > 25) {
    throw new Error('Square number must be between 1 and 25');
  }

  // Calculate the row and column values (1-based)
  const row = Math.floor((squareNumber - 1) / 5) + 1;
  const col = (squareNumber - 1) % 5 + 1;
  const workspace = this.room.workspaces[row - 1][col - 1]; // Adjust indices to be 0-based

  return workspace;
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

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
    initializeWorkspaceStatus() {
    for (let row = 0; row < this.room.rows.length; row++) {
      this.room.workspaces[row] = [];
      for (let col = 0; col < this.room.cols.length; col++) {
        this.room.workspaces[row][col] = new Workspace();

      }
    }
  }
  
  // Modify the bookWorkspace method to book one square at a time and unbook the rest
  bookWorkspace(row: number, col: number, userId: string): void {
    const selectedWorkspace = this.room.workspaces[row][col];

    if (!selectedWorkspace.isTaken) {
      // Unbook all other workspaces
      this.unbookAllWorkspaces();

      // Book the selected workspace
      selectedWorkspace.isTaken = true;
      selectedWorkspace.isFree = false;
      selectedWorkspace.isSelected = true;
      selectedWorkspace.userId = userId;
      selectedWorkspace.row = row;
      selectedWorkspace.column = col;

      // this.sendBookingData(selectedWorkspace)
    } else if (selectedWorkspace.userId === userId) {
      // Unbook the selected workspace if it's already booked by the same user
      selectedWorkspace.isTaken = false;
      selectedWorkspace.isFree = true;
      selectedWorkspace.isSelected = false;
      selectedWorkspace.userId = '';
    }

  }
  
  sendBookingData(selectedWorkspace: any): void {
    selectedWorkspace.date = this.selectedDate;
    selectedWorkspace.time = this.selectedTime;
    selectedWorkspace.room = this.selectedRoom;
    this.sendData.postBookingDetails(selectedWorkspace);
  }
  

  

  // Helper method to unbook all workspaces
  unbookAllWorkspaces(): void {
    for (let row = 0; row < this.room.rows.length; row++) {
      for (let col = 0; col < this.room.cols.length; col++) {
        const workspace = this.room.workspaces[row][col];
        workspace.isTaken = false;
        workspace.isFree = true;
        workspace.isSelected = false;
        workspace.userId = '';
      }
    } 
  } 

  BookWorkspace() {
    if (this.form.valid) {
      // Form is valid, you can access form values using this.form.value
      console.log('Form submitted with values:', this.form.value);
    } else {
      // Form is invalid, handle errors or show validation messages
      console.log('Form is invalid. Please check the fields.');
    }
  }
  searchWorkspace(): void {
  this.loading = true;
  this.bookingService.getBookingData(new Date(), 'Morning', 'A',24)
    .subscribe({
      next: (data: any[]) => {
        this.bookingData = data;
        this.loading = false;

        // Assuming data is an array of workspace objects
        data.forEach((workspaceObj: any) => {
          const workspaceNumber = workspaceObj.workspace.trim();
          const workspace = this.findWorkspace(workspaceNumber); // Use 'this' to invoke the method

          if (workspace) {
            workspace.isTaken = workspaceObj.status === 'taken';
            workspace.isFree = !(workspace.isTaken ||workspace.isBooked);
            workspace.isSelected = workspaceObj.status === 'booked'; // Fix the assignment here
           
            workspace.isTaken =!workspace.isSelected
            console.log(workspace);
          }
        });
      },
      error: (error: any) => {
        this.error = 'An error occurred while fetching data.';
        this.loading = false;
        console.log(error);
      }
    });
}
  
    // dateChanged() {
  //   // Handle date change here
  //   console.log('Selected date:', this.selectedDate);
  // }

//  disableSundays():void {
//   console.log(this.selectedDate)
//   const selectedDate = new Date(this.selectedDate);
//   const isSunday = this.isSunday(selectedDate);
//   console.log(isSunday)
//   if (isSunday) {
//     console.log(selectedDate)
//     this.selectedDate="" 
//   } 
// }
  // isDateValid(selectedDate: Date): boolean {
  //   const currentDate = new Date();
  //   const oneWeekFromNow = new Date(currentDate);
  //   oneWeekFromNow.setDate(currentDate.getDate() + 7); // Add 7 days to the current date

  //   return selectedDate >= currentDate && selectedDate <= oneWeekFromNow;
  // }

  // isSunday(selectedDate: Date): boolean {
  //   console.log("isSunday method return: "+selectedDate.getDay())
  //   return selectedDate.getDay() === 0; // Sunday corresponds to day 0
    
  // }
}
