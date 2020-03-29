import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project, Customer } from '@workshop/core-data';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss']
})
export class ProjectsDetailsComponent implements OnInit {
  selectedProject: Project;
  originalTitle;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() customers: Customer[];
  @Input() set project(value) {
    if (value) {
      this.originalTitle = value.title;
    }
    this.selectedProject = Object.assign({}, value);
  };

  constructor() { }

  ngOnInit(): void {
  }

}
