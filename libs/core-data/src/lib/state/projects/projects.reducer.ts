import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Project } from '../../projects/project.model';
import { ProjectsActionTypes } from './project.actions';

export const initialProjects: Project[] = [
  {
    "id": "1",
    "title": "Project One!",
    "details": "This is a sample project",
    "percentComplete": 16,
    "approved": false,
    "customerId": "1"
  },
  {
    "id": "2",
    "title": "Project Two",
    "details": "Project #2",
    "percentComplete": 100,
    "approved": true,
    "customerId": "3"
  },
  {
    "id": "69hK7ny",
    "title": "Project THREE",
    "details": "Final project in sequence",
    "percentComplete": 0,
    "approved": true,
    "customerId": null
  },
  {
    "id": "D59b2j2",
    "title": "777",
    "details": "Casino GRAND Royale",
    "percentComplete": 19,
    "approved": false,
    "customerId": null
  }
];

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id); 

export interface ProjectsState extends EntityState<Project> {
  selectedProjectId: string | null;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId: null
});

export function projectsReducers(state = initialState, action): ProjectsState {
  switch(action.type) {
    case ProjectsActionTypes.ProjectSelected:
      return Object.assign({}, state, { selectedProjectId: action.payload });
    case ProjectsActionTypes.LoadProjects:
      return adapter.addMany(action.payload, state);
    case ProjectsActionTypes.ProjectAdded:
      return adapter.addOne(action.payload, state);
    case ProjectsActionTypes.UpdateProject:
      return adapter.updateOne(action.payload, state);
    case ProjectsActionTypes.DeleteProject:
      return adapter.removeOne(action.payload, state);
    default:
      return state;
  }
}

export const getSelectedProjectId = (state: ProjectsState) => state.selectedProjectId;

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectedProjectIds = selectIds;
export const selectProjectEntites = selectEntities;
export const selectAllProjects = selectAll;
