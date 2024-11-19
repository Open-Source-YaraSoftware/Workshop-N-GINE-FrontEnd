import {Component, inject, Input} from '@angular/core';
import {Notification} from "../../model/notification.entity";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {DatePipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {NotificationState} from "../../model/notification-state.enum";
import {NotificationService} from "../../services/notification.service";

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
  private notificationsService: NotificationService=inject(NotificationService)

  changeIcon(){
    if(this.notification.state === 1){
      this.notificationsService.updateState(this.notification, 0).subscribe(()=>{})
    }
  }

}
