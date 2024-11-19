import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {BaseMessageComponent} from "../components/base-message/base-message.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationMessagesService {
  constructor(private message: MatSnackBar) { }

  public openMessage(message: string, level: number) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: { message, level },
      panelClass: 'snackbar-content'
    };
    this.message.openFromComponent(BaseMessageComponent, config);
  }
}
