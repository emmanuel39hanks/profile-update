import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';
import { AlertMessagesService } from 'jjwins-angular-alert-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  firstName!: string;
  lastName!: string;
  username!: string;
  email!: string;
  password!: string;

  constructor(
    private router: Router,
    private alertMessage: AlertMessagesService,
    private authService: AuthService,
    private validateService: ValidateService
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit(): any {
    const user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.alertMessage.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.alertMessage.show('Please use a valid e-mail', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }
    // Register User
    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.alertMessage.show('You are now registered, please login.', {
          timeOut: 3000,
        });
        this.router.navigate(['/login']);
      } else {
        this.alertMessage.show('Something went wrong', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/register']);
      }
    });
  }
}
