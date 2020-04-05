import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { 
  Customer, 
  Project, 
  ProjectsService, 
  CustomersService, 
  NotificationsService, 
  ProjectsState,
  SelectProject,
  LoadProjects,
  AddProject,
  UpdateProject,
  DeleteProject,
  initialProjects} from '@workshop/core-data';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
};

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  primaryColor = 'red';
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private projectService: ProjectsService,
    private customerService: CustomersService,
    private store: Store<ProjectsState>,
    private ns: NotificationsService) {
      this.projects$ = store.pipe(
        select('projects'),
        map(data => data.entities),
        map(data => Object.keys(data).map(k => data[k]))
      )
    }


  ngOnInit(): void {
    this.getCustomers();
    this.getProjects();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.currentProject = emptyProject;
  }

  selectProject(project) {
    this.currentProject = project;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    this.store.dispatch(new LoadProjects(initialProjects));
    //this.projects$ = this.projectService.all();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch(new AddProject(project));

    this.resetCurrentProject();
    this.ns.emit('Project created!');
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));

    this.resetCurrentProject();
    this.ns.emit('Project updated!'); 
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));

    this.resetCurrentProject();
    this.ns.emit('Project deleted!');
  }
}
