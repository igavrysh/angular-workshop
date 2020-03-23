import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@workshop/core-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Reactive Workshop';
  isLoggedIn$: Observable<boolean> = this.authService.isAuthenticated$;
  isLoggedIn;

  links = [
    { path: '/', icon: 'home', title: 'Home' },
    { path: '/customers', icon: 'face', title: 'Customers' },
    { path: '/projects', icon: 'work', title: 'Projcts' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn$.subscribe(loggedIn => {
      const path = (loggedIn) ? '' : 'login';
      this.isLoggedIn = loggedIn;
      this.router.navigate([path])
    });
  }

  logout(event) {
    this.authService.logout();
  }

  isSidenavOpen(component, authentication) {
    return component.opened && authentication;
  }
}
