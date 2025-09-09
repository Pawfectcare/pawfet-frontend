import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit {
  username: string = 'Guest';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      this.username = storedUser;
    }
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
