import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Authservice } from '../authservice';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit {
  username: string = 'Guest';
  dropdownOpen: boolean = false;

  constructor(private router: Router,private auth:Authservice) {}

 
  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.auth.getUserDetails().subscribe({
        next: (user) => {
          this.username = user.username;   // ✅ backend response
        },
        error: () => {
          this.username = 'Guest';
        }
      });
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.dropdownOpen = false;
    this.router.navigate(['/pawfetModule/login']);
  }

  bookDaycare() {
    this.router.navigate(['/pawfetModule/book-daycare']);
  }

  shopNow() {
    this.router.navigate(['/pawfetModule/shop']);
  }

  viewDogProfile() {
    this.router.navigate(['/pawfetModule/dogprofile']);
  }
}
