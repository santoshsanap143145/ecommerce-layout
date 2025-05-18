import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IsignIn } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signUpForm!: FormGroup;
  logInForm!: FormGroup;
  hide: boolean = false;
  hasAccount: boolean = false;

  constructor(
    private _authService: AuthService,
    private _snackbarService: SnackbarService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.createSignUpForm();
    this.createLogInForm();
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      userRole: new FormControl('buyer', [Validators.required]),
    });
  }

  createLogInForm() {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      let user: IsignIn = this.signUpForm.value;
      console.log(user);
      this._authService.signIn(user).subscribe({
        next: (res) => {
          this._snackbarService.openSnackBar(res.message); // acc created successfully!!
          // this.signUpForm.reset();
          this.hasAccount = true;
        },
        error: (err) => {
          this._snackbarService.openSnackBar(err.error.message);
        },
      });
    }
  }

  onLogin() {
    if (this.logInForm.valid) {
      let user = this.logInForm.value;
      this._authService.login(user).subscribe({
        next: (res) => {
          console.log(res);
          this._snackbarService.openSnackBar(res.message); // acc created successfully!!
          this._authService.saveToken(res.token);
          this._authService.saveUserRole(res.userRole);
          // this.signUpForm.reset();
          this._router.navigate(['home']);
        },
        error: (err) => {
          this._snackbarService.openSnackBar(err.error.message);
        },
      });
    }
  }
}
