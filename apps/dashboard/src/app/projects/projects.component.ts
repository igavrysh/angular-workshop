import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Project, ProjectsService, CustomersService, NotificationsService } from '@workshop/core-data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  primaryColor = 'red';
  projects$: Observable<Project[]>;
  selectedProject: Project;

  constructor(
    private projectService: ProjectsService,
    private customerService: CustomersService,
    private ns: NotificationsService) {}

  ngOnInit(): void {
    this.resetProject();
    this.getProjects();
  }

  selectProject(project) {
    console.log('SELECTED PROJECT', project);
    this.selectedProject = project;
  }

  resetProject() {
    const emptyProject: Project = {
      id: null,
      title: '',
      details: '',
      percentComplete: 0,
      approved: false,
      customerId: null
    };
    this.selectProject(emptyProject);
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
        this.resetProject();
      });
  }

  updateProject(project) {
    this.projectService.update(project)
      .subscribe(result => {
        this.getProjects();
        this.resetProject();
      });
  }

  deleteProject(project) {
    this.projectService
      .deltete(project.id)
      .subscribe(result => { 
        this.getProjects();
        this.resetProject();
      });
  }

  cancel(project) {
    this.resetProject();
  }

}
