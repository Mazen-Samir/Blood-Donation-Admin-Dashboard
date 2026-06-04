import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../Core/Services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  constructor(private router: Router) {}

  private authService    = inject(AuthService);

  isAppAdmin = this.authService.isAppAdmin();
  isHospAdmin = this.authService.isHospitalAdmin();
  

getFullName() {
    return this.authService.getFullName() || 'User';
  }

  // UserName = this.getFullName();
  
  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

}
