import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../pawfet/cart-component/cart-component';

@Injectable({
  providedIn: 'root'
})
export class Authservice {
    // Now pointing to API Gateway
    private apiBase = 'http://localhost:8081/daycare/bookings';

    constructor(private http: HttpClient) {}
  
    // Login still goes to FastAPI (port 8000)
    login(credentials: { username: string; password: string }): Observable<any> {
      const body = new URLSearchParams();
      body.set('username', credentials.username);
      body.set('password', credentials.password);
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
      return this.http.post<any>(`http://localhost:8000/auth/token`, body.toString(), { headers });
    }
  
    
    signup(data: any) {
      return this.http.post<any>('http://localhost:8000/auth/signup', data);
    }
    getUserDetails() {
      const token = localStorage.getItem('auth_token');
      return this.http.get<any>('http://localhost:8000/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  
   
    getDaycareCenters(): Observable<any[]> {
      
      return this.http.get<any[]>(`${this.apiBase}/daycare/centers`);
    }
  
    bookDaycare(bookingPayload: any): Observable<any> {
      
      return this.http.post<any>(`${this.apiBase}`, bookingPayload);
    }
  
    payForBooking(bookingId: number): Observable<any> {
      
      return this.http.post(`${this.apiBase}/${bookingId}/pay`, {},  { responseType: 'text' }  );
    }

    getProductsByCategory(category: string) {
      return this.http.get<any[]>(`http://localhost:8082/shop/products/by-category/${category}`);
    }
    
    // Add item to cart
    addToCart(userId: number, productId: number, qty: number) {
      return this.http.post<any>(`http://localhost:8082/shop/cart`, { 
        user_id: userId, 
        product_id: productId, 
        quantity: qty 
      });
    }
    getProductsByIds(productIds: number[]): Observable<any[]> {
      return this.http.get<any[]>(`http://localhost:8082/shop/products/`, {
        params: { product_ids: productIds.join(',') }
      });
    }
    getCart(userId: number): Observable<CartItem[]> {
      return this.http.get<CartItem[]>(`http://localhost:8082/shop/cart/${userId}`);
    }
  
    
    // Pay for Shop (final order submission)
    payForShopByUserId(userId: number) {
      return this.http.post<any>(`http://localhost:8082/shop/products/shop/pay/${userId}`, {});
    }
    
  }