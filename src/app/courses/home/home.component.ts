import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { AppState } from "../../reducers";
import {
  advancedCoursesSelector,
  beginnerCoursesSelector,
  totalPromoSelector,
} from "../courses.selectors";
import {compareCourses, Course} from '../model/course';
import {Observable} from "rxjs";
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    loading$: Observable<boolean>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;
    private store = inject(Store<AppState>);
    private dialog = inject(MatDialog);

    ngOnInit() {
      this.reload();
    }

  reload() {
      this.beginnerCourses$ = this.store.pipe(select(beginnerCoursesSelector));
      this.advancedCourses$ = this.store.pipe(select(advancedCoursesSelector));
      this.promoTotal$ = this.store.pipe(select(totalPromoSelector));
  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }
}
