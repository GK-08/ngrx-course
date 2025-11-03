import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";
import { AuthActions } from "../action-types";
import { login } from "../auth.actions";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import { AuthState } from "../../reducers";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private store = inject(Store<AuthState>)

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    const { email, password } = this.form.value;
    this.auth.login(email, password)
      .pipe(
        tap((user) => {
          console.log(user);
          this.store.dispatch(AuthActions.login({ user }));
          void this.router.navigateByUrl('/courses');
        })
    ).subscribe(
      noop,
      () => alert('Login failed')
      )
  }

}

