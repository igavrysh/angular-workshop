import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { 
  Customer, 
  CustomersService, 
  NotificationsService,
  Project,
  ProjectsFacade
} from '@workshop/core-data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  primaryColor = 'red';
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject$: Observable<Project>;

  constructor(
    private customerService: CustomersService,
    private facade: ProjectsFacade,
    private ns: NotificationsService
    ) {
      this.projects$ = facade.projects$;
      this.currentProject$ = facade.currentProject$;
    }

  ngOnInit(): void {
    //this.getCustomers();
    //this.getProjects();
    //this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.facade.selectProject({id: null});
  }

  selectProject(project) {
    this.facade.selectProject(project);
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    console.log('Before getting projects');
    this.facade.getProjects();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.facade.createProject(project);

    this.resetCurrentProject();
    this.ns.emit('Project created!');
  }

  updateProject(project) {
    this.facade.updateProject(project);

    this.resetCurrentProject();
    this.ns.emit('Project updated!'); 
  }

  deleteProject(project) {
    this.facade.deleteProject(project);

    this.resetCurrentProject();
    this.ns.emit('Project deleted!');
  }
}
