import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@workshop/core-data';

@Component({
  selector: 'ui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  filters = [
    'ig-xpro2',
    'ig-willow',
    'ig-walden',
    'ig-valencia',
    'ig-toaster',
    'ig-sutro',
    'ig-sierra',
    'ig-rise',
    'ig-nashville',
    'ig-mayfair',
    'ig-lofi',
    'ig-kelvin',
    'ig-inkwell',
    'ig-hudson',
    'ig-hefe',
    'ig-earlybird',
    'ig-brannan',
    'ig-amaro',
    'ig-1977'
  ];

  chosenFilter = this.filters[Math.floor(Math.random() * this.filters.length)];
  userLogin = { email: '', password: '' };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  login(email, password) {
    // store the token
    this.authService.setToken('you_are_golden');

    // Redirect to home
    this.router.navigate(['']);

    // if we really want to login
    /*
    this.authService
      .login(email, password)
      .subscribe(result => {
        // store the token
        this.authService.setToken(result['access_token']);

        // redirect to home
        this.router.navigate(['']);
    });
    */
  }
}
