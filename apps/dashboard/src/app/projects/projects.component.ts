import { Component, OnInit } from '@angular/core';
import {
  Customer,
  CustomersService,
  NotificationsService,
  Project,
  ProjectsFacade
} from '@workshop/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  primaryColor = 'red';
  projects$: Observable<Project[]> = this.projectsFacade.allProjects$;
  customers$: Observable<Customer[]>;
  currentProject$: Observable<Project> = this.projectsFacade.currentProject$;

  constructor(
    private customerService: CustomersService,
    private projectsFacade: ProjectsFacade,
    private ns: NotificationsService) {
  }

  ngOnInit() {
    this.projectsFacade.loadProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.selectProject({id: null});
  }

  selectProject(project) {
    this.projectsFacade.selectProject(project.id);
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.projectsFacade.createProject(project);

    this.resetCurrentProject();
    this.ns.emit('Project created!');
  }

  updateProject(project) {
    this.projectsFacade.updateProject(project);

    this.resetCurrentProject();
    this.ns.emit('Project updated!');
  }

  deleteProject(project) {
    this.projectsFacade.deleteProject(project);

    this.resetCurrentProject();
    this.ns.emit('Project deleted!');
  }
}
