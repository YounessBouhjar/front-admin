import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  loginInvalid = false;

  constructor(
    private router: Router,
    private loginservice: AuthentificationService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  checkLogin() {
    console.log(this.email.value);
    this.loginservice
      .authentificate(this.email.value, this.password.value)
      .subscribe(
        (data) => {
          this.loginInvalid = false;
          this.router.navigate(['/overview/admins']);
          sessionStorage.setItem('password',btoa(this.password.value))
          sessionStorage.setItem('idUsr',data.id.toString())

          console.log("data login : " +JSON.stringify(data));

        },
        (error) => {
          this.loginInvalid = true;
        }
      );
  }
}