import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Authservice } from '../authservice';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup-component',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Authservice,
    private router: Router,
    private dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.signupForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: () => {
          alert('Signup successful');
          this.dialogRef.close(true);
        },
        error: () => alert('Signup failed')
      });
    }
  }

  closeDialog() {
     this.dialogRef.close(true); 
  }


}
