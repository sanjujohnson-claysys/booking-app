// shared.service.ts
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriggerNavbarService {
  private navbarRoleSubject = new Subject<void>();

  navbarRole$ = this.navbarRoleSubject.asObservable();

  triggerNavbarRole() {
    this.navbarRoleSubject.next();
  }
}
