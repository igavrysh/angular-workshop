import { Injectable } from "@angular/core";
import { Store, select, ActionsSubject } from '@ngrx/store';

import { selectCurrentProject, selectAllProjects } from '..';
import * as ProjectsActions from './project.actions';
import { ProjectsState } from './projects.reducer';


@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {
  allProjects$ = this.store.pipe(select(selectAllProjects));
  currentProject$ = this.store.pipe(select(selectCurrentProject));

  constructor(
    private store: Store<ProjectsState>,
    private actions$: ActionsSubject) {
  }

  loadProjects() {
    this.store.dispatch(new ProjectsActions.LoadProjects());
  }

  selectProject(itemId) {
    this.store.dispatch(new ProjectsActions.ProjectSelected(itemId));
  }

  createProject(project) {
    this.store.dispatch(new ProjectsActions.AddProject(project));
  }

  updateProject(project) {
    this.store.dispatch(new ProjectsActions.UpdateProject(project));
  }

  deleteProject(project) {
    this.store.dispatch(new ProjectsActions.DeleteProject(project));
  }
}
