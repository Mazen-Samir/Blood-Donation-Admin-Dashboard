import { Component } from '@angular/core';
import { AuthService } from '../../../../Core/Services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  constructor(private authService: AuthService, private router: Router) {}
  

getFullName() {
    return this.authService.getFullName() || 'User';
  }

  // UserName = this.getFullName();
  
  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

}
