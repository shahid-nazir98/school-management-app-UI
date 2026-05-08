import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
    import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, 
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';

constructor(private api: ApiService, 
  private router: Router,private dialog: MatDialog) {}

login() {
   if (!this.email || !this.password) {
    return;
  }
    this.api.login(this.email, this.password).subscribe({
    next: (res: any) => {
      localStorage.setItem('token', res.token); //  save token
      localStorage.setItem('email', this.email)
      this.router.navigate(['/dashboard']);
    },
    error: () => {
      alert('Invalid credentials');
    }
  });
}

register(){
 this.dialog.open(RegisterComponent, {
    width: '500px',
    height: 'auto'
  });
}


}