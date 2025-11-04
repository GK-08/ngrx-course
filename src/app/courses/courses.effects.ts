import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { concatMap, map, tap } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {
	actions$ = inject(Actions)
	coursesHttpService = inject(CoursesHttpService);
	loadCourses$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CourseActions.loadAllCourses),
			concatMap(() => this.coursesHttpService.findAllCourses()),
			map(courses => CourseActions.allCoursesLoaded({ courses })),
		);
	});

	saveCourses$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(CourseActions.courseUpdated),
				concatMap(action => this.coursesHttpService.saveCourse(action.update.id, action.update.changes)),
			)
		},
		{ dispatch: false }
	)
}
