import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "./action-types";
import { compareCourses, Course } from "./model/course";

export type CoursesState = EntityState<Course> & {
	allCoursesLoaded: boolean;
};

export const adapter = createEntityAdapter<Course>({
	sortComparer: compareCourses,
});

export const initialCoursesState: CoursesState = adapter.getInitialState({
		allCoursesLoaded: false
	},
);

export const coursesReducer = createReducer(
	initialCoursesState,
	on(
		CourseActions.allCoursesLoaded,
		(state, action) => adapter.addMany(
			action.courses, {
				...state,
				allCoursesLoaded: true
			},
		)
	),
	on(
		CourseActions.courseUpdated,
		(state, action) => {
			return adapter.updateOne(action.update, state);
		}
	)
);

export const {
	selectAll,
	selectTotal,
} = adapter.getSelectors();
