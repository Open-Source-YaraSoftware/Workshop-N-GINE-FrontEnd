import {Component, inject, OnInit, signal} from '@angular/core';
import {Notification} from "../../model/notification.entity";
import {NotificationItemComponent} from "../../components/notification-item/notification-item.component";
import {NotificationService} from "../../services/notification.service";
import {NotificationManager} from "../../model/notification-manager.entity";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NotificationItemComponent,
    TranslateModule
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  protected notificationManager=signal<NotificationManager>(new NotificationManager());
  private notificationsService: NotificationService=inject(NotificationService)

  ngOnInit(): void{
    this.notificationsService.getByUserId(2)
      .subscribe((data:Notification[])=>{
        const updatedManager = new NotificationManager();
        updatedManager.notifications = data;
        this.notificationManager.set(updatedManager);
        console.log(this.notificationManager().notifications)
      })
  }

}
