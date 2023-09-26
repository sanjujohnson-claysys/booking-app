import { Component } from '@angular/core';

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
  userId: string = "-1";
  row: number = -1;
  column: number = -1;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  selectedDate: Date;
  selectedTime: string;
  selectedRoom: string = 'A'; // Initialize with 'A' by default

  workspaceStatus: { row: number, col: number, status: string, bookedBy: string }[] = [];
  selectedWorkspace: { row: number, col: number } | null = null;

  room: Room = new Room();
  workspace: Workspace = new Workspace();
  randomNumber = (Math.floor(Math.random() * 30) + 1);

  constructor() {
    this.selectedDate = new Date();
    this.selectedTime = "";
    this.initializeWorkspaceStatus();
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
  } else if (selectedWorkspace.userId === userId) {
    // Unbook the selected workspace if it's already booked by the same user
    selectedWorkspace.isTaken = false;
    selectedWorkspace.isFree = true;
    selectedWorkspace.isSelected = false;
    selectedWorkspace.userId = '';
  }
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


}
