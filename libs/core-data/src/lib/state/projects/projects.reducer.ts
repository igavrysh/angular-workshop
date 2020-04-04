import { Project } from '../../projects/project.model';

const initialProjects: Project[] = [
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
    "title": "",
    "details": "",
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

export interface ProjectsState {
  projects: Project[];
  selectedProjectId: string | null;
}   

export const initialState: ProjectsState = {
  projects: initialProjects,
  selectedProjectId: null
}

export function projectsReducers(state = initialState, action): ProjectsState {
    switch(action.type) {
      case 'select':
        return {
          selectedProjectId: action.payload,
          projects: state.projects
        }
      case 'create':
        return {
          selectedProjectId: state.selectedProjectId,
          projects: createProject(state.projects, action.payload)
        };
      case 'update':
        return {
          selectedProjectId: state.selectedProjectId,
          projects: updateProject(state.projects, action.payload)
        };
      case 'delete':
        return {
          selectedProjectId: state.selectedProjectId,
          projects: deleteProject(state.projects, action.payload)
        };
      default:
        return state;
    }
}