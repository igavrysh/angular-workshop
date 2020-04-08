import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomers from './customers/customers.reducer';
import * as fromProjects from './projects/projects.reducer';
import { Project } from '../projects/project.model';

export interface AppState {
  customers: fromCustomers.CustomersState,
  projects: fromProjects.ProjectsState
}

export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducers
};

// -------------------------------------------------------------------
// PROJECTS SELECTORS
// -------------------------------------------------------------------
export const selectProjectState
  = createFeatureSelector<fromProjects.ProjectsState>('projects');

export const selectProjectIds = createSelector(
  selectProjectState,
  fromProjects.selectProjectIds
);

export const selectProjectEntities = createSelector(
  selectProjectState,
  fromProjects.selectProjectEntities
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
  selectProjectEntities,
  selectCurrentProjectId,
  (projectEntites, projectId) => {
    console.log('selectCurrentProject block');
    return projectId ? projectEntites[projectId] : emptyProject;
  } 
)

// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<fromCustomers.CustomersState>('customers');

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