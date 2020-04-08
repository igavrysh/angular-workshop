import { 
  EntityState, 
  EntityAdapter, 
  createEntityAdapter } from '@ngrx/entity';
import { Project } from '../../projects/project.model';
import { ProjectsActionTypes, ProjectsActions } from './project.actions';

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject
  = (projects, project) => projects.filter(w => project.id !== w.id); 

export interface ProjectsState extends EntityState<Project> {
  selectedProjectId: string | null;
}

export const adapter: EntityAdapter<Project> 
  = createEntityAdapter<Project>();

export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId: null
});

export function projectsReducers(
  state = initialState, action: ProjectsActions): ProjectsState {
  switch(action.type) {
    case ProjectsActionTypes.ProjectSelected:
      return Object.assign({}, state, { selectedProjectId: action.payload });
    case ProjectsActionTypes.ProjectsLoaded:
      console.log('project Reducers: ' + action.payload);
      return adapter.addAll(action.payload, state);
    case ProjectsActionTypes.ProjectAdded:
      return adapter.addOne(action.payload, state);
    case ProjectsActionTypes.UpdateProject:
      return adapter.updateOne(
        {id: action.payload.id, changes: action.payload}, 
        state);
    case ProjectsActionTypes.DeleteProject:
      return adapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}

export const getSelectedProjectId 
  = (state: ProjectsState) => state.selectedProjectId;

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectedProjectIds = selectIds;
export const selectProjectEntites = selectEntities;
export const selectAllProjects = selectAll;
