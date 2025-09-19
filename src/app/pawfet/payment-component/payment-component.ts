import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../authservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-payment-component',
  imports: [FormsModule,CommonModule],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css'
})
export class PaymentComponent {
  selectedPaymentMethod: string = '';
  username!:string;

paymentMethods = [
  { name: 'Google Pay', icon: 'assets/payment/googlepay2.jpg' },

  { name: 'Debit Card', icon: 'assets/payment/DebitCard.jpg' },
  { name: 'Credit Card', icon: 'assets/payment/credit-card.png' },
];

  constructor(private auth: Authservice, private router: Router) {}


      ngOnInit(): void {
       this.auth.getUserDetails().subscribe({
      next: (user) => {
        this.username = user.username;   
   
      },
      error: () => {
        alert('User not logged in!');
        this.router.navigate(['/login']);
      }
    });
    }
  submitPayment() {
    if (!this.selectedPaymentMethod) {
      alert('Please select a payment method!');
      return;
    }

    const stateData: any = history.state;

  
if (stateData.userId && stateData.orderId) {
  const userId = stateData.userId;
  const orderId = stateData.orderId;

  this.auth.payForShopByUserId(userId).subscribe({
    next: () => {
      alert(`Payment successful via ${this.selectedPaymentMethod} (Order #${orderId})`);
      this.router.navigate(['/pawfetModule/home']);
    },
    error: () => alert('Payment failed')
  });
  return;
}

 
    if (stateData.bookingData) {
      const bookingData = stateData.bookingData;
      const payload = {
        dogId: bookingData.dogId,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        notes: bookingData.notes,
        daycareCenter: { id: bookingData.daycareCenterId },
        ownerUsername: this.username
      };

      this.auth.bookDaycare(payload,).subscribe({
        next: (bookingCreated) => {
          const bookingId = bookingCreated.id;
          this.auth.payForBooking(bookingId).subscribe({
            next: () => {
              alert(`Payment successful via ${this.selectedPaymentMethod}`);
              this.router.navigate(['/pawfetModule/home']);
            },
            error: () => alert('Payment failed after booking')
          });
        },
        error: () => alert('Booking failed')
      });
      return;
    }

  
    alert('No valid data found for payment!');
  }
}