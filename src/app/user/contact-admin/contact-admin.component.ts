import { Component } from '@angular/core';
import { UserService } from 'src/app/user/userService/user.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css'],
})
export class ContactAdminComponent {
  constructor(private contactAdminService: UserService) {}

  subject = '';
  messageText = '';
  employeeId = -1;
  submitMessage() {
    this.subject;
    this.messageText;
    this.employeeId;

    this.contactAdminService
      .sendMessage(this.subject, this.messageText, this.employeeId)
      .subscribe(
        (response) => {
          // Handle success response here
          console.log('Message sent successfully:', response);
        },
        (error) => {
          // Handle error here
          console.error('Error sending message:', error);
        }
      );
  }
}
