import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { AuthActions } from "../auth/action-types";

export const authFeatureKey = 'auth';

export type AppState = {
	auth: AuthState;
	router: unknown;
}

export type AuthState = {
	user?: unknown;
}

export const initialAuthState: AuthState = {
	user: undefined,
}

export const authReducer = createReducer(
	initialAuthState,
	on(AuthActions.login, (state, action) => {
		return {
			user: action.user,
		}
	}),
	on(AuthActions.logout, (state, action) => {
		return {
			user: undefined
		}
	})
)

export const reducers: ActionReducerMap<AppState> = {
	auth: authReducer,
	router: routerReducer
};
