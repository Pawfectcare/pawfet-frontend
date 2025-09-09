import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../authservice';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-payment-component',
  imports: [FormsModule],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css'
})
export class PaymentComponent {
  selectedPaymentMethod: string = '';

  paymentMethods = [
    { name: 'Google Pay', icon: 'assets/payments/google-pay.png' },
    { name: 'PhonePe', icon: 'assets/payments/phonepe.png' },
    { name: 'Paytm', icon: 'assets/payments/paytm.png' },
    { name: 'Debit Card', icon: 'assets/payments/debit-card.png' },
    { name: 'Credit Card', icon: 'assets/payments/credit-card.png' },
    { name: 'Net Banking', icon: 'assets/payments/netbanking.png' }
  ];

  constructor(private auth: Authservice, private router: Router) {}

  submitPayment() {
    if (!this.selectedPaymentMethod) {
      alert('Please select a payment method!');
      return;
    }

    const stateData: any = history.state;

    // Check if it's a cart purchase
if (stateData.cartData) {
  const userId = stateData.cartData.userId; // only need userId now
  this.auth.payForShopByUserId(userId).subscribe({
    next: () => {
      alert(`Payment successful via ${this.selectedPaymentMethod}`);
      this.router.navigate(['/pawfetModule/home']);
    },
    error: () => alert('Payment failed')
  });
  return;
}

    // Check if it's a daycare booking
    if (stateData.bookingData) {
      const bookingData = stateData.bookingData;
      const payload = {
        dogId: bookingData.dogId,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        notes: bookingData.notes,
        daycareCenter: { id: bookingData.daycareCenterId }
      };

      this.auth.bookDaycare(payload).subscribe({
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

    // No valid data passed
    alert('No valid data found for payment!');
  }
}