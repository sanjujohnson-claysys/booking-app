import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserBookingStatusService } from 'src/app/user-booking-status.service';
import { AdminActionsService } from 'src/app//admin-actions.service';
import { MarkUnavailable } from '../mark-unavailable';
import { MarkWorkspaceUnavailableService } from '../mark-workspace-unavailable.service';
import { FetchEmployeeIdsService } from 'src/app//fetch-employee-ids.service';
import { ActivatedRoute } from '@angular/router';

interface BookingData {
  BookingDate: string;
  BookingTime: string;
  BookedRoom: string;
  Status: string;
  EmployeeId: number;
  EmployeeName: string; // Change the data type to number
  BookedWorkspace: string; // Change the data type to string
  // Add any other properties specific to the data you want to send
}

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
  // Unique identifier for the workspace, you can use row and column
  row: number;
  column: number;

  // Status properties
  isTaken: boolean = false; // Indicates if the workspace is currently occupied
  isBooked: boolean = false; // Indicates if the workspace is booked for a future reservation
  isSelected: boolean = false; // Indicates if the workspace is selected
  isFree: boolean = true; // Indicates if the workspace is available for use
  isUnavailable: boolean = false;
  // User information
  userId: string | undefined; // If the workspace is taken, store the user's ID here

  // Room information
  roomCode: string | undefined; // Store the room code where the workspace is located
  BookedWorkspace: number | undefined;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  selectedTime: string = ''; // Initialize as null
  selectedRoom: string = ''; // Initialize with 'A' by default

  workspaceStatus: {
    row: number;
    col: number;
    status: string;
    bookedBy: string;
  }[] = [];
  selectedWorkspace!: number;

  room: Room = new Room();

  randomNumber = Math.floor(Math.random() * 30) + 1;
  selectedDate: string = new Date().toISOString().split('T')[0];

  currentDate: string;
  // employeeId: number = 22;
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

  constructor(
    private sendData: DataService,
    private fb: FormBuilder,
    private bookingService: UserBookingStatusService,
    private unavailable: MarkWorkspaceUnavailableService,
    private fetchidsandnames: FetchEmployeeIdsService,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    this.currentDate = this.formatDate(today);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);

    // this.maxDate = this.formatDate(maxDate);

    console.log('constructor inside' + this.selectedDate);
    this.initializeWorkspaceStatus();
  }
  // isAdmin: Boolean = true;

  //
  isUserBooking: boolean = false;
  isAdminBooking: boolean = true;
  isAdminMarkUnavailable: boolean = false;
  selectFeature(featureType: string): void {
    this.isUserBooking = false;
    this.isAdminBooking = false;
    this.isAdminMarkUnavailable = false;

    if (featureType === 'user-booking') {
      this.isUserBooking = true;
    } else if (featureType === 'admin-booking') {
      this.isAdminBooking = true;
    } else if (featureType === 'admin-mark-unavailable') {
      this.isAdminMarkUnavailable = true;
    }
  }
  subscribeToRouteParams(): void {
    this.route.paramMap.subscribe((params) => {
      const featureType = params.get('type');
      if (featureType !== null) {
        this.selectFeature(featureType);
      }
    });
  }

  //
  bookingData: any[] = [];
  loading = false;
  error = '';
  isMarkUnavailable: Boolean = false;
  ngOnInit(): void {
    this.searchWorkspace();
    this.fetchEmployees();
    this.subscribeToRouteParams();
  }

  findWorkspace(squareNumber: number): Workspace {
    if (squareNumber < 1 || squareNumber > 25) {
      throw new Error('Square number must be between 1 and 25');
    }

    // Calculate the row and column values (1-based)
    const row = Math.floor((squareNumber - 1) / 5) + 1;
    const col = ((squareNumber - 1) % 5) + 1;
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
        this.room.workspaces[row][col] = new Workspace(row, col); // Pass row and col values
      }
    }
  }

  // Modify the bookWorkspace method to book one square at a time and unbook the rest
  bookWorkspace(row: number, col: number, userId: string): void {
    const selectedWorkspace = this.room.workspaces[row][col];

    if (this.isWorkspaceAvailable(selectedWorkspace)) {
      this.unbookPreviouslySelectedWorkspace(userId);
      this.bookSelectedWorkspace(selectedWorkspace, userId);

      // Calculate the booked workspace number and assign it to selectedWorkspace.BookedWorkspace
      const bookedWorkspaceNumber = this.room.getCellNumber(row, col);
      selectedWorkspace.BookedWorkspace = bookedWorkspaceNumber;
      this.selectedWorkspace = bookedWorkspaceNumber;
    } else if (this.isWorkspaceSelectedByUser(selectedWorkspace, userId)) {
      this.unbookSelectedWorkspace(selectedWorkspace);
    }
  }

  isWorkspaceAvailable(workspace: Workspace): boolean {
    return !workspace.isTaken && workspace.isFree;
  }

  isWorkspaceSelectedByUser(workspace: Workspace, userId: string): boolean {
    return workspace.userId === userId;
  }

  unbookSelectedWorkspace(workspace: Workspace): void {
    workspace.isTaken = false;
    workspace.isSelected = false;
    workspace.userId = '';
  }

  bookSelectedWorkspace(workspace: Workspace, userId: string): void {
    // Ensure that the workspace is free before booking it
    if (workspace.isFree) {
      workspace.isTaken = true;
      workspace.isSelected = true;
      workspace.userId = userId;
    }
  }

  // Helper method to unbook the previously selected workspace by the user
  unbookPreviouslySelectedWorkspace(userId: string): void {
    for (let row = 0; row < this.room.rows.length; row++) {
      for (let col = 0; col < this.room.cols.length; col++) {
        const workspace = this.room.workspaces[row][col];
        if (workspace.isSelected && workspace.userId === userId) {
          workspace.isTaken = false;
          workspace.isSelected = false;
          workspace.userId = '';
        }
      }
    }
  }

  sendBookingData(): void {
    const workspaceData: BookingData = {
      BookingDate: this.selectedDate,
      BookingTime: this.selectedTime,
      BookedRoom: this.selectedRoom,
      BookedWorkspace: this.selectedWorkspace.toString(), // Convert to string
      EmployeeId: this.selectedId, // No need to convert to string
      EmployeeName: 'tobechanged',
      Status: 'Booked',
    };

    console.log(workspaceData);

    this.sendData.postBookingDetails(workspaceData).subscribe(
      (response) => {
        // Handle the successful response here
        console.log('Post request successful', response);
        // You can perform further actions after a successful request.
      },
      (error) => {
        // Handle errors here
        console.error('Error in post request', error);
        // You can handle and display the error to the user.
      }
    );
  }

  BookWorkspace() {
    // Form is valid, you can access form values using this.form.value
    console.log('Button working');
  }
  searchWorkspace(): void {
    this.loading = true;
    this.bookingService
      .getBookingData(
        this.selectedDate,
        (this.selectedTime = 'morning'),
        (this.selectedRoom = 'A'),
        this.selectedId
      )
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
              workspace.isFree = !(workspace.isTaken || workspace.isBooked);
              workspace.isSelected = workspaceObj.status === 'booked'; // Fix the assignment here

              workspace.isTaken = !workspace.isSelected;
              console.log(workspace);
            }
          });
        },
        error: (error: any) => {
          this.error = 'An error occurred while fetching data.';
          this.loading = false;
          console.log(error);
        },
      });
  }
  // TODO:
  // cancelBooking() {
  //   this.unavailable.cancelBooking(this.cancelBookingData).subscribe(
  //     (response: any) => {
  //       console.log('Booking Cancelled:', response);
  //       // Handle success response, e.g., display a success message.
  //     },
  //     (error: any) => {
  //       console.error('Error cancelling booking:', error);
  //       // Handle error, e.g., display an error message.
  //     }
  //   );
  // }

  markSelectedWorkspacesUnavailable(): void {
    const selectedWorkspaceIds: number[] = [];

    for (let row = 0; row < this.room.rows.length; row++) {
      for (let col = 0; col < this.room.cols.length; col++) {
        const workspace = this.room.workspaces[row][col];
        if (workspace.isSelected) {
          selectedWorkspaceIds.push(this.room.getCellNumber(row, col)); // Assuming you have a unique identifier for each workspace.
        }
      }
    }

    if (selectedWorkspaceIds.length > 0) {
      const UnavailableWorkSpaces: MarkUnavailable = {
        bookingDate: this.selectedDate,
        bookingTime: this.selectedTime,
        bookedRoom: this.selectedRoom,
        markUnavailable: selectedWorkspaceIds,
      };

      // Send the 'UnavailableWorkSpaces' to the backend using the service
      this.unavailable.markUnavailable(UnavailableWorkSpaces).subscribe(
        (response) => {
          // Handle the API response, if needed
          console.log('Workspaces marked as unavailable:', response);
        },
        (error) => {
          // Handle errors, if any
          console.error('Error marking workspaces as unavailable:', error);
        }
      );
    } else {
      alert('Please select at least one workspace to mark as unavailable.');
    }
  }

  toggleWorkspaceSelection(row: number, col: number): void {
    const selectedWorkspace = this.room.workspaces[row][col];
    if (!selectedWorkspace.isTaken) {
      selectedWorkspace.isSelected = !selectedWorkspace.isSelected;
    }
  }
  employees: any[] | undefined;
  selectedId: number = -1;

  fetchEmployees() {
    this.fetchidsandnames.getEmployees().subscribe((data) => {
      this.employees = data;
      console.log(this.employees);
    });
  }

  getNameById(id: string | number): string {
    // Convert the `id` to a number if it's a string
    const idNumber = typeof id === 'string' ? parseInt(id, 10) : id;

    // Find the user by the numeric `idNumber`
    const user = this.employees?.find((item) => item.id === idNumber);

    return user ? user.fullName.trim() : '';
  }

  sendSelectedWorkspacesToBackend(selectedWorkspaceIds: number[]): void {
    // Send the 'selectedWorkspaceIds' list to the backend using Angular's HTTP client.
    // You can structure the data as needed for your backend API.
    // this.sendData.postSelectedWorkspaces(selectedWorkspaceIds).subscribe(
    //   (response) => {
    //     // Handle the successful response here
    //     console.log('Post request successful', response);
    //     // You can perform further actions after a successful request.
    //   },
    //   (error) => {
    //     // Handle errors here
    //     console.error('Error in post request', error);
    //     // You can handle and display the error to the user.
    //   }
    // );
  }

  //  onSubmit() {
  //     this.adminService
  //       .cancelBookingAndMarkUnavailable(this.bookingId, [this.workspaceNumber])
  //       .subscribe(
  //         (response) => {
  //           this.message = 'Bookings canceled and workspaces marked as unavailable.';
  //         },
  //         (error) => {
  //           this.message = 'An error occurred: ' + error.message;
  //         }
  //       );
  //   }

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
