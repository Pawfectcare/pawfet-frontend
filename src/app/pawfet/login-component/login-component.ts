import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Authservice } from '../authservice';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SignupComponent } from '../signup-component/signup-component';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Authservice,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const username = this.loginForm.value.username;
  //     const password = this.loginForm.value.password;
  //     this.authService.login({username,password }).subscribe({
  //       next: (res) => {
  //         console.log('Login successful, token:', res.access_token);
  //         localStorage.setItem('auth_token', res.access_token);
  //         localStorage.setItem('username', res.username); 
  //         alert('Login succefull');
  //         this.router.navigate(['/pawfetModule/home']);
        
  //       },
  //       error: (err) => {
  //         console.error('Login failed:', err);
  //         alert('Invalid username or password');
  //       }
  //     });
  //   }
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.authService.login({ username, password }).subscribe({
        next: (res) => {
          console.log('Login successful, token:', res.access_token);

          // ✅ Save token
          localStorage.setItem('auth_token', res.access_token);

          // ✅ Now call /auth/me to fetch user info
          this.authService.getUserDetails().subscribe({
            next: (user) => {
              localStorage.setItem('username', user.username);
              alert(`Welcome, ${user.username}!`);
              this.router.navigate(['/pawfetModule/home']);
            },
            error: () => {
              alert('Failed to fetch user details');
            }
          });
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Invalid username or password');
        }
      });
    }
  }

  openDialog() {
    this.dialog.open(SignupComponent, {
      width: '800px', 
      height: '400px'
      
    });
  }


}
