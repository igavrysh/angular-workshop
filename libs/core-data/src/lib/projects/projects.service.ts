import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

import { Project } from './project.model';
import { NotificationsService } from '../notifications/notifications.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  model = 'projects';

  constructor(
    private httpClient: HttpClient,
    private notificationsService: NotificationsService
  ) { }

  getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.httpClient.get<Project[]>(this.getUrl());
  }

  load(id) {
    return this.httpClient.get<Project>(this.getUrlForId(id));
  }

  loadByCustomer(customerId: string) {
    return this.httpClient.get<Project[]>(this.getUrl(), {params: {customerId}})
      .pipe(
        switchMap(projects => {
          if (projects.length) {
            return of(projects);
          } else {
            return throwError(`No projects exist for customer with ID ${customerId}`);
          }
        }),
        catchError(error => {
          this.notificationsService.emit(error);
          return throwError(error);
        })
    )
  }

  create(project) {
    return this.httpClient.post(this.getUrl(), project);
  }

  update(project) {
    return this.httpClient.patch(this.getUrlForId(project.id), project);
  }

  deltete(projectId) {
    return this.httpClient.delete(this.getUrlForId(projectId));
  }
}
