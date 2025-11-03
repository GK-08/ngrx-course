import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action-types";

@Injectable()
export class AuthEffects {
	private actions$ = inject(Actions);
	private router = inject(Router);

	login$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(AuthActions.login),
				tap(action => {
					localStorage.setItem('user', JSON.stringify(action.user))
				})
			)
		},
		{ dispatch: false }
	)

	logout$ = createEffect(
		() => {
				return this.actions$.pipe(
					ofType(AuthActions.logout),
					tap(() => {
						localStorage.removeItem('user');
						void this.router.navigateByUrl('/login');
					})
				)
		}
		,{dispatch: false}
	)
}
