import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { 
  Customer, 
  Project, 
  ProjectsService, 
  CustomersService, 
  NotificationsService } from '@workshop/core-data';

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
    private ns: NotificationsService) {}

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
    this.projects$ = this.projectService.all();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.projectService.create(project)
      .subscribe(result => {
        this.getProjects();
        this.resetCurrentProject();
        this.ns.emit('Project created!');
      });
  }

  updateProject(project) {
    this.projectService.update(project)
      .subscribe(result => {
        this.getProjects();
        this.resetCurrentProject();
        this.ns.emit('Project updated!');
      });
  }

  deleteProject(project) {
    this.projectService
      .deltete(project.id)
      .subscribe(result => { 
        this.getProjects();
        this.resetCurrentProject();
        this.ns.emit('Project deleted!');
      });
  }


}
