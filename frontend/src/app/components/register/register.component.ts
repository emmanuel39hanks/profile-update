import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';
import { ToastrService } from 'ngx-toastr';
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
    private authService: AuthService,
    private validateService: ValidateService,
    private toastMessage: ToastrService
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.toastMessage.warning('Please fill in all fields');
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.toastMessage.warning('Please use a valid e-mail');
      return false;
    }
    // Register User
    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.toastMessage.success('You are now registered, please login.');
        this.router.navigate(['/login']);
        return true;
      } else {
        this.toastMessage.error(data.message);
        this.router.navigate(['/register']);
        return false;
      }
    });
    return true;
  }
}
