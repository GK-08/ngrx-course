import { routerReducer } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from "../../environments/environment";
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

export function logger(reducer:ActionReducer<AppState>):ActionReducer<AppState> {
	return (state, action) => {
		console.log('state before: ', state);
		console.log('action: ', action);

		return reducer(state, action);
	}
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
