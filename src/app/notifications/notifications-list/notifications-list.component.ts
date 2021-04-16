import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsService, Command } from '../notifications.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {

  messages$: Observable<Command[]>;

  constructor(
    private notificationsService: NotificationsService
  ) {
    this.messages$ = this.notificationsService.messagesOutput;

  }

  ngOnInit(): void {
  }

  onClearMessage(id: number) {
    this.notificationsService.clearMessage(id);
  }

}
