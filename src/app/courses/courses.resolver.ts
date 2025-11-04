import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, finalize, first, tap } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { areCoursesLoaded } from "./courses.selectors";

export const coursesResolver: ResolveFn<unknown> = () => {
	let loading = false;
	const store = inject(Store);
	return store.pipe(
		select(areCoursesLoaded),
		tap((coursesLoaded) => {
			if (!loading && !coursesLoaded) {
				loading = true;
				store.dispatch(CourseActions.loadAllCourses());
			}
		}),
		filter(coursesLoaded => coursesLoaded),
		first(),
		finalize(() => loading = false)
	)
}
