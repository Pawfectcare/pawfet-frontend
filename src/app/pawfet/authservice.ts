import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authservice {
    // Now pointing to API Gateway
    private apiBase = 'http://localhost:8082/daycare/bookings';

    constructor(private http: HttpClient) {}
  
    // Login still goes to FastAPI (port 8000)
    login(credentials: { username: string; password: string }): Observable<any> {
      const body = new URLSearchParams();
      body.set('username', credentials.username);
      body.set('password', credentials.password);
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
      return this.http.post<any>(`http://localhost:8000/auth/token`, body.toString(), { headers });
    }
  
    // Signup also goes to FastAPI
    signup(data: any) {
      return this.http.post<any>('http://localhost:8000/auth/signup', data);
    }
  
    // All booking-related requests now go through the Gateway
    getDaycareCenters(): Observable<any[]> {
      const token = localStorage.getItem('auth_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any[]>(`${this.apiBase}/daycare/centers`, { headers });
    }
  
    bookDaycare(bookingPayload: any): Observable<any> {
      const token = localStorage.getItem('auth_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<any>(`${this.apiBase}`, bookingPayload, { headers });
    }
  
    payForBooking(bookingId: number): Observable<any> {
      const token = localStorage.getItem('auth_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${this.apiBase}/${bookingId}/pay`, {}, { headers });
    }
  }