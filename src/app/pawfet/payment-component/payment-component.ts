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

  // Default selection
  selectedPaymentMethod: string = '';

  // Static payment methods (with icons)
  paymentMethods = [
    { name: 'Google Pay', icon: 'assets/payments/google-pay.png' },
    { name: 'PhonePe', icon: 'assets/payments/phonepe.png' },
    { name: 'Paytm', icon: 'assets/payments/paytm.png' },
    { name: 'Debit Card', icon: 'assets/payments/debit-card.png' },
    { name: 'Credit Card', icon: 'assets/payments/credit-card.png' },
    { name: 'Net Banking', icon: 'assets/payments/netbanking.png' }
  ];

  constructor(
    private bookingService: Authservice,
    private router: Router
  ) {}

  submitFinalBooking() {
    if (!this.selectedPaymentMethod) {
      alert('Please select a payment method first!');
      return;
    }

    const bookingData = history.state.bookingData;

    const payload = {
      dogId: bookingData.dogId,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      notes: bookingData.notes,
      daycareCenter: { id: bookingData.daycareCenterId }
    };

    this.bookingService.bookDaycare(payload).subscribe({
      next: (bookingCreated) => {
        const bookingId = bookingCreated.id;

        this.bookingService.payForBooking(bookingId).subscribe({
          next: () => {
            alert(`Payment successful via ${this.selectedPaymentMethod}`);
            this.router.navigate(['/pawfetModule/home']);
          },
          error: () => alert('Payment failed after booking')
        });
      },
      error: () => alert('Booking failed')
    });
  }
}
