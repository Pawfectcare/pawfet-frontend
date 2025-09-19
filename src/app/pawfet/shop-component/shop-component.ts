import { Component } from '@angular/core';
import { Authservice } from '../authservice';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-component',
  imports: [CommonModule],
  templateUrl: './shop-component.html',
  styleUrls: ['./shop-component.css']
})
export class ShopComponent {
  categories: ('Food' | 'Toys' | 'Grooming')[] = ['Food', 'Toys', 'Grooming'];
  selectedCategory: 'Food' | 'Toys' | 'Grooming' = 'Food';

  products: Product[] = [];
 userId!: number; 

  constructor(private auth: Authservice, private router: Router) {}

  ngOnInit(): void {

     this.auth.getUserDetails().subscribe({
      next: (user) => {
        this.userId = user.id;  
        this.loadProducts();
      },
      error: () => {
        alert('User not logged in!');
        this.router.navigate(['/login']);
      }
    });
  }

  loadProducts() {
    this.auth.getProductsByCategory(this.selectedCategory).subscribe({
      next: res => {
        this.products = res.map(p => ({
          ...p,
          image: `assets/product/${p.id}.png`
        }));
      },
      error: () => this.products = []
    });
  }

  selectCategory(cat: 'Food' | 'Toys' | 'Grooming') {
    this.selectedCategory = cat;
    this.loadProducts();
  }

  addToCart(product: Product) {
    this.auth.addToCart(this.userId, product.id, 1).subscribe({
      next: () => alert(`${product.name} added to cart!`),
      error: () => alert('Failed to add product to cart')
    });
  }

  goToCart() {
    this.router.navigate(['/pawfetModule/cart']);
  }
}
