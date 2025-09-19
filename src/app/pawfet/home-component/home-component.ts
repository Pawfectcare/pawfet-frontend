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

  constructor(private router: Router, private auth: Authservice) {}

  ngOnInit(): void {
   
      this.auth.getUserDetails().subscribe({
        next: (user) => {
          this.username = user.username;
        },
        error: () => {
          this.username = 'Guest';
        }
      });
    }
  
 capitalize(name: string): string {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.router.navigate(['/pawfetModule/login']);
  }

  bookDaycare() {
    this.router.navigate(['/pawfetModule/book-daycare']);
  }
   contact() {
    this.router.navigate(['/pawfetModule/contact']);
  }

   about() {
    this.router.navigate(['/pawfetModule/about']);
  }


  shopNow() {
    this.router.navigate(['/pawfetModule/shop']);
  }

  viewDogProfile() {
    this.router.navigate(['/pawfetModule/dogprofile']);
  }
  
}
