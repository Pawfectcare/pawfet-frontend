import { Component,OnInit } from '@angular/core';
import { Authservice } from '../authservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product_name: string;
  price: number;
}
@Component({
  selector: 'app-cart-component',
  imports: [CommonModule],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css'
})


export class CartComponent implements OnInit {
  
    cart: CartItem[] = [];
    userId = 1;
  
    constructor(private auth: Authservice, private router: Router) {}
  
    ngOnInit(): void {
      this.auth.getCart(this.userId).subscribe({
        next: res => this.cart = res,
        error: () => this.cart = []
      });
    }
  
    cartTotal(): number {
      return this.cart.reduce((s, i) => s + i.price * i.quantity, 0);
    }
  
    goToPayment() {
      const cartData = {
        userId: this.userId,
        cart: this.cart,
        total: this.cartTotal()
      };
      this.router.navigate(['/pawfetModule/payment'], { state: { cartData } });
    }

    getImageUrl(productId: number): string {
      const imageUrl = `/assets/product/${productId}.png`;
      return imageUrl;
    }
  }