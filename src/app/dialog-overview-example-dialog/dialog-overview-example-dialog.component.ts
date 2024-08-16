import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CoursesService } from '../courses.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatDialogClose,
    ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrl: './dialog-overview-example-dialog.component.scss'
})
export class DialogOverviewExampleDialogComponent {

  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialogComponent>);
  myForm: FormGroup;
  currencies = [];



  constructor(private coursesService: CoursesService, private fb: FormBuilder) {

  }
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  universities = [];
  countries = [];
  cities = [];
  picker1: any;



  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    if (this.coursesService.editData) {
      this.myForm = this.fb.group({
        CourseName: [this.coursesService.editData.CourseName, Validators.required],
        University: [this.coursesService.editData.University, Validators.required],
        Country: [this.coursesService.editData.Country, Validators.required],
        City: [this.coursesService.editData.City, Validators.required],
        Price: [this.coursesService.editData.Price.replace(/^\D+/g, '').replace(/,/g, ''), Validators.required],
        Currency: [this.coursesService.editData.Currency, Validators.required],
        StartDate: [this.coursesService.editData.StartDate, Validators.required],
        EndDate: [this.coursesService.editData.EndDate, Validators.required],
        CourseDescription: [this.coursesService.editData.CourseDescription, Validators.required],
      });
    } else {
      this.myForm = this.fb.group({
        CourseName: ['', Validators.required],
        University: ['', Validators.required],
        Country: ['', Validators.required],
        City: ['', Validators.required],
        Price: ['', Validators.required],
        Currency: ['', Validators.required],
        StartDate: ['', Validators.required],
        EndDate: ['', Validators.required],
        CourseDescription: ['', Validators.required],
      });
    }




    this.universities = [...new Set(this.coursesService.courseData.map(item => item.University))];
    this.countries = [...new Set(this.coursesService.courseData.map(item => item.Country))];
    this.cities = [...new Set(this.coursesService.courseData.map(item => item.City))];
    this.currencies = [...new Set(this.coursesService.courseData.map(item => item.Currency))];

  }

  saveCourse() {

    if (this.coursesService.editData) {
      let courseObj = this.myForm.getRawValue();
      courseObj = {
        ...courseObj,
        StartDate: new Date(courseObj.StartDate),
        EndDate: new Date(courseObj.EndDate),
        // Price: parseInt(courseObj.Price.substring(1).replace(/,/g, ''))

      }
      console.log(courseObj);

      this.dialogRef.close();

      this.coursesService.editCourse(this.coursesService.editData.id, courseObj).subscribe(() => {
        this.coursesService.editData = false;
        this.coursesService.triggerRefresh();
      });
    } else {
      let courseObj = this.myForm.getRawValue();
      courseObj = {
        ...courseObj,
        StartDate: new Date(courseObj.StartDate.toLocaleDateString()),
        EndDate: new Date(courseObj.EndDate.toLocaleDateString()),
      }
      console.log(courseObj);

      this.dialogRef.close();

      this.coursesService.saveCourse(courseObj).subscribe(() => {
        this.coursesService.triggerRefresh();
      });
    }


  }

}
