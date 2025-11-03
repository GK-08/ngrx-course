import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { isLoggedIn } from "./auth.selector";

export const authGuard: CanActivateFn = () => {
	const store = inject(Store);
	const router = inject(Router);
	return store.pipe(
		select(isLoggedIn),
		tap(loggedIn => {
			if (!loggedIn) {
				void router.navigateByUrl('/login');
			}
		})
	)
}
