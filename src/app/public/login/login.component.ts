import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  loading = false;
  form: FormGroup;

  message;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  public onSubmit = () => {
    this.message = undefined;
    this.submitted = true;

    if (this.form.invalid) return;

    console.log('onSubmit');
    console.log(this.form.valid);
    console.log(this.form.value.username);
    console.log(this.form);

    this.loading = true;

    this.loginService
      .login(this.form.value.username, this.form.value.password)
      .toPromise()
      .then((res: LoginResponse) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.loginService.currentTokenValue = res.token;
        this.router.navigate(['/app']);
      })
      .catch((err) => {
        console.log(err);
        this.message = err.error.error.toString();
      })
      .finally(() => {
        this.loading = false;
      });

    console.log('depois da requisição');
  };
}
