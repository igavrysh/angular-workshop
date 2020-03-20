import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '@workshop/core-data'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  primaryColor = 'red';
  projects$: Observable<Project[]>;
  selectedProject: Project;

  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  selectProject(project) {
    console.log('SELECTED PROJECT', project);
    this.selectedProject = project;
  }

  cancel() {
    this.selectProject(null);
  }

  getProjects() {
    this.projects$ = this.projectService.all();
  }

  saveProject(project) {
    console.log('SAVING PROJECT', project);
  }

  deleteProject(project) {
    this.projectService.deltete(project.id).subscribe(result => this.getProjects());
  }
}
