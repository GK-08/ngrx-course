import { Component, inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthActions } from "./auth/action-types";
import { isLoggedIn } from "./auth/auth.selector";
import { AppState } from "./reducers";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {

    loading = true;
    private store = inject(Store<AppState>);
    protected isLoggedIn$: Observable<boolean>;

    constructor(private router: Router) {

    }

    ngOnInit() {

      const userInfo = localStorage.getItem('user');
      if (userInfo) {
        this.store.dispatch(AuthActions.login({user: JSON.parse(userInfo)}))
      }

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

			this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    }

    logout() {
      this.store.dispatch(AuthActions.logout())
    }
}
