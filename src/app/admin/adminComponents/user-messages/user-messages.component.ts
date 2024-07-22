import { Component, OnInit } from '@angular/core';
import { AdminActionsService } from 'src/app/admin/adminServices/admin-actions.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css'],
})
export class UserMessagesComponent implements OnInit {
  messages: any[] | undefined; // Define the messages array to store data

  constructor(private messageService: AdminActionsService) {}

  ngOnInit(): void {
    // Make an HTTP request to fetch data from your API
    this.messageService
      .getMessagesByDateRange('2023-01-01', '2023-12-31')
      .subscribe((data) => {
        this.messages = data;
      });
  }
}
