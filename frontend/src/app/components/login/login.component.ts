import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertMessagesService } from 'jjwins-angular-alert-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertMessage: AlertMessagesService
  ) {}

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };

    this.authService.authenticateUser(user).subscribe((data) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.alertMessage.show("You are now logged in!", {
          cssClass: 'alert-success',
          timeOut: 5000,
        });
        this.router.navigate(['/dashboard']);
      } else {
        this.alertMessage.show(data.message, {
          cssClass: 'alert-danger',
          timeOut: 5000,
        });
        this.router.navigate(['/login']);
      }
    });
  }
}
