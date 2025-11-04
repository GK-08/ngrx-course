import { createFeatureSelector, createSelector } from "@ngrx/store";
import { allCoursesLoaded } from "./course.actions";
import { CoursesState } from "./course.reducers";
import * as CourseSelectors from './course.reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
	selectCoursesState,
	CourseSelectors.selectAll
)

export const beginnerCoursesSelector = createSelector(
	selectAllCourses,
	courses => courses.filter(course => course.category === 'BEGINNER')
);

export const advancedCoursesSelector = createSelector(
	selectAllCourses,
	courses => courses.filter(course => course.category === 'ADVANCED')
);

export const totalPromoSelector = createSelector(
	selectAllCourses,
	courses => courses.filter(course => course.promo).length
);

export const areCoursesLoaded = createSelector(
	selectCoursesState,
	state => state.allCoursesLoaded,
);
