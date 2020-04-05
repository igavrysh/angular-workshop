
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProjects from './projects/projects.reducer';

export interface AppState {
  projects: fromProjects.ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.projectsReducers
};

export const selectProjectState = createFeatureSelector<fromProjects.ProjectsState>('projects');

export const selectProjectIds = createSelector(
  selectProjectState,
  fromProjects.selectedProjectIds
);

export const selectProjectEntites = createSelector(
  selectProjectState,
  fromProjects.selectProjectEntites
)

export const selectAllProjects = createSelector(
  selectProjectState,
  fromProjects.selectAllProjects
)

export const selectCurrentProjectId = createSelector(
  selectProjectState,
  fromProjects.getSelectedProjectId
)

export const selectCurrentProject = createSelector(
  selectProjectEntites,
  selectCurrentProjectId,
  (projectEntites, projectId) => {
    console.log('SELECTOR! ', projectId);
    return projectEntites[projectId];

  } 
)