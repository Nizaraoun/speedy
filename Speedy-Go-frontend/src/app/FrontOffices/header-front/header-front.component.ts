import { Component } from '@angular/core';
import { AuthService } from '../services/user/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {
  ToTrips() {
    this.router.navigate(['/trips']);
  }

  isLoggedIn: boolean = false;
  first_name: string = '';
  isAdminPage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // Subscribe to router events to detect when URL changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Check if current URL contains '/admin'
      this.isAdminPage = event.url.includes('/admin');
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    if (this.isLoggedIn) {
      const user = this.authService.getUser();
      console.log("ahawa",user);
      this.first_name = user ? user.firstName : 'User';
    }
    
    // Check current URL on component initialization
    this.isAdminPage = this.router.url.includes('/admin');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }
  
  ToStore(): void {
    this.router.navigate(['/storlist']);
  }
}

