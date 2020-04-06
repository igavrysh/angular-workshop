import { 
  ActionReducerMap, 
  createFeatureSelector, 
  createSelector } from '@ngrx/store';
import * as fromCustomers from './customers/customers.reducer';
import * as fromProjects from './projects/projects.reducer';
import { Project } from '../projects/project.model';

export interface AppState {
  projects: fromProjects.ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.projectsReducers
};

// -------------------------------------------------------------------
// PROJECTS SELECTORS
// -------------------------------------------------------------------
export const selectProjectState 
  = createFeatureSelector<fromProjects.ProjectsState>('projects');

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

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
};

export const selectCurrentProject = createSelector(
  selectProjectEntites,
  selectCurrentProjectId,
  (projectEntites, projectId) => {
    return projectId ? projectEntites[projectId] : emptyProject;
  } 
)

// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState 
  = createFeatureSelector<fromCustomers.CustomersState>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);

export const selectCustomersProjects = createSelector(
  selectAllCustomers,
  selectAllProjects,
  (customers, projects) => {
    return customers.map(customer => {
      return Object.assign({}, {
        ...customer,
        projects: projects.filter(
          project => project.customerId === customer.id)
      })
    })
  }
)