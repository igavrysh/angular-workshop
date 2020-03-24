import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ProjectsService } from './projects/projects.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { CustomersService } from './customers/customers.service';

@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    CustomersService,
    ProjectsService
  ]
})
export class CoreDataModule {}
