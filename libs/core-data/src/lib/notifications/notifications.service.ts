import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationsService {

  constructor(private snakBar: MatSnackBar) { }

  emit(notification) {
    console.log(`NotificationService ${notification}`);
   // this.snakBar.open(notification, 'OK', { duration: 3000 });
  }
}
