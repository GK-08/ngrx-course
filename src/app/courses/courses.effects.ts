import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { concatMap, map, tap } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {
	actions$ = inject(Actions)
	coursesHttpService = inject(CoursesHttpService);
	loadCourses$ = createEffect(() => {
		return this.actions$.pipe(
			tap(()=>console.log('aeee1')),
			ofType(CourseActions.loadAllCourses),
			tap(()=>console.log('aeee2')),
			concatMap(() => this.coursesHttpService.findAllCourses()),
			tap(()=>console.log('aeee')),

			map(courses => CourseActions.allCoursesLoaded({ courses })),
		);
	});
}
