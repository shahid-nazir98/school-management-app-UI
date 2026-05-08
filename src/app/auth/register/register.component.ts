import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private api: ApiService, private router: Router,
     private dialogRef: MatDialogRef<RegisterComponent>
  ) {}

  register() {
    this.api.register(this.user).subscribe({
      next: () => {
        alert('Registered Successfully');
        this.dialogRef.close(true);
        this.router.navigate(['/']); // go to login
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  goToLogin() {
  this.dialogRef.close(); 
  this.router.navigate(['/']);

}
}