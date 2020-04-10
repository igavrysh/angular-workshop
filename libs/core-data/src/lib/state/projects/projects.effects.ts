import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { Observable } from 'rxjs';

import { Project } from '../../projects/project.model';
import { ProjectsState } from './projects.reducer';
import { ProjectsService } from '../../projects/projects.service';
import {
  ProjectsActionTypes,
  DeleteProject,
  LoadProjects,
  UpdateProject,
  ProjectDeleted,
  ProjectsLoaded,
  AddProject,
  ProjectAdded,
  ProjectUpdated
} from './project.actions';

@Injectable({providedIn: 'root'})
export class ProjectsEffects {
  @Effect() effect$ = this.actions$.pipe(ofType(ProjectsActionTypes.ProjectsAction));

  @Effect()
  loadProjects$ = this.dataPersistence.fetch(ProjectsActionTypes.LoadProjects, {
    run: (action: LoadProjects, state: ProjectsState) => {
      console.log('Running loadProjects Effect');
      return this.projectsService.all().pipe(map((res: Project[]) => {
        console.log('Loaded from service projects ', res);
        return new ProjectsLoaded(res)
      }))
    },
    onError: (action: LoadProjects, error) => {
      console.log('Error', error);
    }
  });

  @Effect()
  addProject$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.AddProject,
    {
      run: (action: AddProject, state: ProjectsState) => {
        return this.projectsService.create(action.payload)
          .pipe(map((res: Project) => new ProjectAdded(res)))
      },
      onError: (action: AddProject, error) => {
        console.log('Error', error);
      }
    });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ) {}
}
