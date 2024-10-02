import {Component, Input} from '@angular/core';
import {Notification} from "../../model/notification.entity";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {DatePipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {NotificationState} from "../../model/notification-state.enum";

@Component({
  selector: 'app-notification-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardContent,
    MatCardTitle,
    DatePipe,
    MatIcon,
    NgIf
  ],
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.css'
})

export class NotificationItemComponent{
  @Input() notification!: Notification


  changeIcon(){
    this.notification.state = NotificationState.READ;
  }

}
