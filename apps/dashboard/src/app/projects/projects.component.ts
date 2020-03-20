import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '@workshop/core-data'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  primaryColor = 'red';
  projects: Project[];
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
    this.projectService.all().subscribe((result: any) => this.projects = result);
  }

}
