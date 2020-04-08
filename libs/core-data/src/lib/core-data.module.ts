import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { CustomersService } from './customers/customers.service';
import { NotificationsService } from './notifications/notifications.service';
import { ProjectsService } from './projects/projects.service';
import { StateModule } from './state/state.module';


@NgModule({
  providers: [
    AuthService,
    AuthGuardService,
    CustomersService,
    NotificationsService,
    CustomersService,
    ProjectsService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule
  ]
})
export class CoreDataModule {}
