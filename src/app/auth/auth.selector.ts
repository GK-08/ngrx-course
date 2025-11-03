import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers";

export const selectAuthState = createFeatureSelector<AuthState>('auth')

// TODO: check deprecation
export const isLoggedIn = createSelector(
	selectAuthState,
	auth => !!auth.user
);
