import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  // Hardcoded username and password
  private readonly hardcodedUsername = 'admin';
  private readonly hardcodedPassword = 'password';

  login() {
    if (this.username === this.hardcodedUsername && this.password === this.hardcodedPassword) {
      this.router.navigate(['/students']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}