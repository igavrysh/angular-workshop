import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Project } from '../../projects/project.model';
import { Customer } from '../../customers/customer.model';
import { ProjectsState, selectAllProjects } from './projects.reducer';
import { selectCurrentProject } from '..';
import { LoadProjects, DeleteProject, UpdateProject, AddProject, SelectProject } from './project.actions';

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {
  projects$: Observable<Project[]>;
  currentProject$: Observable<Project>;

  constructor(private store: Store<ProjectsState>) {
    this.projects$ = store.pipe(select(selectAllProjects));
    this.currentProject$ = store.pipe(select(selectCurrentProject));
  }

  getProjects() {
    this.store.dispatch(new LoadProjects());
  }

  selectProject(project) {
    this.store.dispatch(new SelectProject(project.id));
  }

  createProject(project) {
    this.store.dispatch(new AddProject(project));
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));

  }

}