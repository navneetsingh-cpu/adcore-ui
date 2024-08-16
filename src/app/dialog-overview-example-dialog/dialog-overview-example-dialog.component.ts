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

    this.universities = [...new Set(this.coursesService.courseData.map(item => item.University))];
    this.countries = [...new Set(this.coursesService.courseData.map(item => item.Country))];
    this.cities = [...new Set(this.coursesService.courseData.map(item => item.City))];
    this.currencies = [...new Set(this.coursesService.courseData.map(item => item.Currency))];

  }

  saveCourse() {


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
