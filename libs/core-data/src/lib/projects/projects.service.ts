import { Injectable } from '@angular/core';
import { Project } from './project';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';


const BASE_URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  model = 'projects';

  constructor(private httpClient: HttpClient) { }

  getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.httpClient.get<Project[]>(this.getUrl());
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
