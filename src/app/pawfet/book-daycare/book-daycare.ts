
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice } from '../authservice';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-book-daycare',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './book-daycare.html',
  styleUrl: './book-daycare.css'
})
export class BookDaycare implements OnInit{
  bookingForm: FormGroup;
  centers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private bookingService:Authservice,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      dogId: [''],
      date: [''],
      timeSlot: [''],
      notes: [''],
      daycareCenterId: ['']
    });
  }

  ngOnInit(): void {
    this.bookingService.getDaycareCenters().subscribe({
      next: (data: any[]) => {
        console.log('Centers loaded', data);
        this.centers = data;
      },
      error: (err) => {
        console.error('Failed to load centers', err);
        alert('Failed to load centers');
      }
    });
  }

  goToPayment() {
    const bookingData = this.bookingForm.value;
    this.router.navigate(['/pawfetModule/payment'], { state: { bookingData } });
  }
}
