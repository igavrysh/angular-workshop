import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@workshop/material';

import { ProjectsDetailsComponent } from './projects-details/projects-details.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsComponent } from './projects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { Project, ProjectsService } from '@workshop/core-data';
import { By } from '@angular/platform-browser';
import { noop } from 'rxjs';


describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let de: DebugElement;
  let projectsService: ProjectsService;

  const mockProjectsService = {
    all() { 
      return noop(); 
    }
  };

  const emptyProject: Project = {
    id: null,
    title: '',
    details: '',
    percentComplete: 0,
    approved: false,
    customerId: null
  };

  beforeEach(async(() => {
    // Instantiate test bed
    fixture = TestBed.configureTestingModule({
      declarations: [ 
        ProjectsComponent,
        ProjectsListComponent,
        ProjectsDetailsComponent
      ],
      providers: [
        {
          provide: ProjectsService,
          useValue: mockProjectsService
        }
      ],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    }).createComponent(ProjectsComponent);

    // Get THE component instance
    component = fixture.componentInstance;

    // Get the debug element aka the element the component lives on   
    de = fixture.debugElement;

    // Get service instance
    projectsService = de.injector.get(ProjectsService);
    
    // Manually force change detection
    fixture.detectChanges();

  }));

  it('should should have a primaryColor of `red`', () => {
    expect(component.primaryColor).toBe('red');
  });

  it('should select a project', () => {
    component.selectProject(emptyProject);
    expect(component.currentProject).toBe(emptyProject);
  });

  it('should display primaryColor', ()=> {
    const h1 = de.query(By.css('h1'));
    expect(h1.nativeElement.innerText).toBe('red');
  });

  it('should update h1 to new primaryColor', () => {
    const h1 = de.query(By.css('h1'));
    component.primaryColor = 'black';
    fixture.detectChanges();
    expect(h1.nativeElement.innerText).toBe('black');
  })
});
